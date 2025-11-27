import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { usePrivy } from "@privy-io/react-auth";
import { uploadJson } from "@/lib/arweave/uploadJson";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import getMomentOnChainInfo from "@/lib/viem/getTokenInfo";
import { toast } from "sonner";
import { callUpdateMomentURI } from "@/lib/moment/callUpdateMomentURI";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";

const useUpdateMomentURI = () => {
  const { moment, fetchTokenInfo } = useMomentProvider();
  const {
    name: providerName,
    description: providerDescription,
    imageUri,
    animationUri,
    mimeType,
    downloadUrl,
    resetForm,
  } = useMomentFormProvider();
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateTokenURI = async () => {
    setIsLoading(true);
    try {
      const tokenInfo = await getMomentOnChainInfo(moment);
      const current = await fetchTokenMetadata(tokenInfo.tokenUri);

      const updatedAnimationUrl = animationUri || current?.animation_url;
      const updatedContentUri = downloadUrl || current?.content?.uri;
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
          (updatedContentUri || updatedMimeType) && !updatedMimeType?.includes("image")
            ? {
                mime: updatedMimeType || current?.content?.mime || "",
                uri: updatedContentUri || current?.content?.uri || "",
              }
            : current?.content,
      };

      if (!updated.name) throw new Error("Missing token name");

      const newUri = await uploadJson(updated);

      if (!moment?.collectionAddress || !moment?.tokenId) {
        throw new Error("Missing token context");
      }

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      await callUpdateMomentURI({
        tokenContractAddress: moment.collectionAddress,
        tokenId: moment.tokenId,
        newUri,
        accessToken,
      });

      if (updatedMimeType?.includes("video")) {
        await migrateMuxToArweaveApi({
          tokenContractAddress: moment.collectionAddress,
          tokenId: moment.tokenId,
          accessToken,
        });
        resetForm();
      }

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
