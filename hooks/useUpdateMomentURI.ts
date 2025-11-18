import { useState } from "react";
import { useTokenProvider } from "@/providers/TokenProvider";
import { CHAIN_ID } from "@/lib/consts";
import { usePrivy } from "@privy-io/react-auth";
import { uploadJson } from "@/lib/arweave/uploadJson";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { toast } from "sonner";
import { callUpdateMomentURI } from "@/lib/moment/callUpdateMomentURI";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";

const useUpdateMomentURI = () => {
  const { token, fetchTokenInfo } = useTokenProvider();
  const {
    name: providerName,
    description: providerDescription,
    imageUri,
    animationUri,
    mimeType,
  } = useMomentFormProvider();
  const { getAccessToken } = usePrivy();
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

      if (!token?.tokenContractAddress || !token?.tokenId) {
        throw new Error("Missing token context");
      }

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      await callUpdateMomentURI({
        tokenContractAddress: token.tokenContractAddress,
        tokenId: token.tokenId,
        newUri,
        accessToken,
      });

      fetchTokenInfo();
      toast.success("Token metadata updated successfully");
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

export default useUpdateMomentURI;
