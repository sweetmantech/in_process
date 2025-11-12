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
import { toast } from "sonner";

const useUpdateTokenURI = () => {
  const { token, fetchTokenInfo } = useTokenProvider();
  const { signTransaction } = useSignTransaction();
  const {
    name: providerName,
    description: providerDescription,
    imageUri,
    animationUri,
    mimeType,
  } = useMomentManageProvider();
  const { artistWallet } = useUserProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateTokenURI = async () => {
    setIsLoading(true);
    try {
      const tokenInfo = await getTokenInfo(token.tokenContractAddress, token.tokenId, CHAIN_ID);
      const current = await fetchTokenMetadata(tokenInfo.tokenUri);

      const updatedAnimationUrl = animationUri || current?.animation_url;
      const updatedMimeType = mimeType || current?.content?.mime;

      const name = providerName || current?.name;
      const description = providerDescription || current?.description;

      const updated = {
        ...(current || {}),
        name,
        description,
        image: imageUri || current?.image,
        animation_url: updatedAnimationUrl,
        content:
          updatedAnimationUrl || updatedMimeType
            ? {
                mime: updatedMimeType || current?.content?.mime || "",
                uri: updatedAnimationUrl || current?.content?.uri || "",
              }
            : current?.content,
      };

      if (!updated.name) throw new Error("Missing token name");

      const newUri = await uploadJson(updated);

      if (!artistWallet) throw new Error("Wallet not connected");
      if (!token?.tokenContractAddress || !token?.tokenId) {
        throw new Error("Missing token context");
      }

      const publicClient = getPublicClient(CHAIN_ID);
      const hash = await signTransaction({
        address: token.tokenContractAddress,
        abi: zoraCreator1155ImplABI,
        functionName: "updateTokenURI",
        args: [BigInt(token.tokenId), newUri],
        account: artistWallet as Address,
        chain: CHAIN,
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      fetchTokenInfo();
      toast.success("Token metadata updated successfully");
      return receipt;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to update token metadata");
      throw error;
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
