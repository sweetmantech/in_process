import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { callUpdateMomentURI } from "@/lib/moment/callUpdateMomentURI";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";
import useMetadataUpload from "@/hooks/useMetadataUpload";

const useUpdateMomentURI = () => {
  const { moment, metadata } = useMomentProvider();
  const {
    name,
    mimeType,
    setIsUploading,
    setUploadProgress,
    setImageFile,
    setAnimationFile,
    setPreviewFile,
    setMimeType,
    setDownloadUrl,
    setEmbedCode,
    setLink,
    setWritingText,
  } = useMetadataFormProvider();
  const { getAccessToken } = usePrivy();
  const { generateMetadataUri } = useMetadataUpload();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resetMediaState = () => {
    // Clear all files and media-related state (preserve name and description)
    setImageFile(null);
    setAnimationFile(null);
    setPreviewFile(null);
    setMimeType("");
    setDownloadUrl("");
    setEmbedCode("");
    setLink("");
    setWritingText("");
  };

  const updateTokenURI = async () => {
    setIsLoading(true);
    try {
      if (!name) {
        throw new Error("Missing token name");
      }

      const existingMetadata = metadata ?? null;
      const newUri = await generateMetadataUri(existingMetadata);

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      await callUpdateMomentURI({
        moment,
        newUri,
        accessToken,
      });

      if (mimeType?.includes("video")) {
        await migrateMuxToArweaveApi(
          {
            collectionAddress: moment.collectionAddress,
            tokenIds: [moment.tokenId],
            chainId: moment.chainId,
          },
          accessToken
        );
      }

      // Reset media state after successful save (for all file types)
      resetMediaState();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to update token metadata");
      throw error;
    } finally {
      setIsLoading(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    updateTokenURI,
    isLoading,
  };
};

export default useUpdateMomentURI;
