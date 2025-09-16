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

const useMediaConfig = () => {
  const { token, fetchTokenInfo } = useTokenProvider();
  const { signTransaction } = useSignTransaction();
  const { connectedAddress } = useUserProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setMetadata = async (newUri: string) => {
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

  const generateNewMetadataFromToken = async (
    chainId: number,
    collection: Address,
    tokenId: string,
    title: string,
    description: string,
  ): Promise<string> => {
    const tokenInfo = await getTokenInfo(collection, tokenId, chainId);
    const current = await fetchTokenMetadata(tokenInfo.tokenUri);

    const updated = { ...(current || {}), name: title, description };
    return uploadJson(updated);
  };

  return {
    setMetadata,
    generateNewMetadataFromToken,
    isLoading,
  };
};

export default useMediaConfig;
