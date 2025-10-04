import { useState } from "react";
import { useTokenProvider } from "@/providers/TokenProvider";
import { Address } from "viem";
import useSignTransaction from "./useSignTransaction";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN, CHAIN_ID } from "@/lib/consts";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { useUserProvider } from "@/providers/UserProvider";
import { uploadJson } from "@/lib/arweave/uploadJson";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { useMomentManageProvider } from "@/providers/MomentManageProvider";

const useUpdateTokenURI = () => {
  const { token, fetchTokenInfo } = useTokenProvider();
  const { signTransaction } = useSignTransaction();
  const { name, description, imageUri } = useMomentManageProvider();
  const { connectedAddress } = useUserProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateTokenURI = async () => {
    const tokenInfo = await getTokenInfo(
      token.tokenContractAddress,
      token.tokenId,
      CHAIN_ID,
    );
    const current = await fetchTokenMetadata(tokenInfo.tokenUri);

    const updated = {
      ...(current || {}),
      name,
      description,
      image: imageUri || current?.image,
      animation_url: imageUri || current?.animation_url,
      ...(current?.content && {
        content: { ...current.content, uri: imageUri || current.content.uri },
      }),
    };

    if (!updated.name) throw new Error("Missing token name");
    if (!updated.description) throw new Error("Missing token description");

    const newUri = await uploadJson(updated);

    if (!connectedAddress) throw new Error("Wallet not connected");
    if (!token?.tokenContractAddress || !token?.tokenId) {
      throw new Error("Missing token context");
    }
    setIsLoading(true);
    try {
      const publicClient = getPublicClient(CHAIN_ID);
      const hash = await signTransaction({
        address: token.tokenContractAddress,
        abi: zoraCreator1155ImplABI,
        functionName: "updateTokenURI",
        args: [BigInt(token.tokenId), newUri],
        account: connectedAddress as Address,
        chain: CHAIN,
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      fetchTokenInfo();
      return receipt;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateTokenURI,
    isLoading,
  };
};

export default useUpdateTokenURI;
