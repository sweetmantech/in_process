import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { usePrivy } from "@privy-io/react-auth";
import { uploadJson } from "@/lib/arweave/uploadJson";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import getTokenInfo from "@/lib/viem/getMomentOnChainInfo";
import { toast } from "sonner";
import { callUpdateMomentURI } from "@/lib/moment/callUpdateMomentURI";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";
import { uploadVideoToMuxIfNeeded } from "@/lib/metadata/uploadVideoToMuxIfNeeded";
import { uploadFilesToArweave } from "@/lib/metadata/uploadFilesToArweave";

const useUpdateMomentURI = () => {
  const { moment, fetchTokenInfo } = useMomentProvider();
  const {
    name: providerName,
    description: providerDescription,
    mimeType,
    previewFile,
    imageFile,
    animationFile,
    resetForm,
  } = useMomentFormProvider();
  const { getAccessToken } = usePrivy();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateTokenURI = async () => {
    setIsLoading(true);
    try {
      const tokenInfo = await getTokenInfo(moment);
      const current = await fetchTokenMetadata(tokenInfo.tokenUri);

      // Generate URIs from blob files if they exist (similar to create flow)
      let animation_url = current?.animation_url || "";
      let image = current?.image || "";
      let contentUri = current?.content?.uri || "";
      const updatedMimeType = mimeType || current?.content?.mime || "";

      // Upload video to Mux if animation file exists and mimeType indicates video
      const videoResult = await uploadVideoToMuxIfNeeded(animationFile, mimeType, getAccessToken);
      if (videoResult.animationUrl) {
        animation_url = videoResult.animationUrl;
        contentUri = videoResult.contentUri;
      }

      // Upload files to Arweave if they exist as blobs
      const fileUploadResult = await uploadFilesToArweave(
        previewFile,
        imageFile,
        animationFile,
        animation_url
      );

      // Use uploaded URIs if files were uploaded, otherwise keep existing
      if (fileUploadResult.image) {
        image = fileUploadResult.image;
      }
      if (fileUploadResult.animationUrl) {
        animation_url = fileUploadResult.animationUrl;
      }

      const name = providerName || current?.name;
      const description = providerDescription || current?.description;

      const updated = {
        ...(current || {}),
        name,
        description,
        image: image || current?.image,
        animation_url: animation_url || current?.animation_url,
        content:
          (contentUri || updatedMimeType) && !updatedMimeType?.includes("image")
            ? {
                mime: updatedMimeType || current?.content?.mime || "",
                uri: contentUri || current?.content?.uri || "",
              }
            : current?.content,
      };

      if (!updated.name) throw new Error("Missing token name");

      const newUri = await uploadJson(updated);

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      await callUpdateMomentURI({
        moment,
        newUri,
        accessToken,
      });

      if (updatedMimeType?.includes("video")) {
        await migrateMuxToArweaveApi(
          {
            collectionAddress: moment.collectionAddress,
            tokenIds: [moment.tokenId],
            chainId: moment.chainId,
          },
          accessToken
        );
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
