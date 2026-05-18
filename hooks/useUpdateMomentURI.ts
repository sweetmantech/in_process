import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { callUpdateMomentURI } from "@/lib/moment/callUpdateMomentURI";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useMetadataUpload from "@/hooks/useMetadataUpload";
import { useUserProvider } from "@/providers/UserProvider";

const useUpdateMomentURI = () => {
  const { moment, metadata } = useMomentProvider();
  const {
    name,
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
  const { getAuthHeaders } = useUserProvider();
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

      const authHeaders = await getAuthHeaders();

      await callUpdateMomentURI({
        moment,
        newUri,
        authHeaders,
      });

      // Reset media state after successful save (for all file types)
      resetMediaState();
    } catch (error: any) {
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
