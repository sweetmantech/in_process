import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { callUpdateMomentURI } from "@/lib/moment/callUpdateMomentURI";
import { useMomentFormProvider } from "@/providers/MomentFormProvider";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";
import useMomentMetadata from "@/hooks/useMomentMetadata";

const useUpdateMomentURI = () => {
  const { moment, fetchMomentData } = useMomentProvider();
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
  } = useMomentFormProvider();
  const { getAccessToken } = usePrivy();
  const { generateMetadataUri } = useMomentMetadata();
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

      // Use existing metadata generation from creation flow
      const newUri = await generateMetadataUri();

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

      // Fetch updated metadata to show in ContentRenderer
      fetchMomentData();
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
