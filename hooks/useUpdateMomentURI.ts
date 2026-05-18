import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { callUpdateMomentURI } from "@/lib/moment/callUpdateMomentURI";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useMetadataUpload from "@/hooks/useMetadataUpload";
import { useUserProvider } from "@/providers/UserProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { createMomentApi } from "@/lib/moment/createMomentApi";
import { Address } from "viem";
import { buildMetadataPayload } from "@/lib/metadata/buildMetadataPayload";
import { toast } from "sonner";

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
  const { selectedCollection } = useCollectionsProvider();
  const { createParameters } = useMomentCreateParameters();

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
    try {
      setIsLoading(true);
      if (!name) {
        throw new Error("Missing token name");
      }

      const existingMetadata = metadata ?? null;
      const newUri = await generateMetadataUri(existingMetadata);

      let contractAddress = moment.collectionAddress;
      const shouldChangeCollection = selectedCollection !== moment.collectionAddress;

      if (shouldChangeCollection) {
        const isConfirm = await toast.confirm("Are you sure you want to change the collection?");
        if (!isConfirm) {
          return;
        }
      }
      if (shouldChangeCollection) {
        const parameters = createParameters(newUri);
        const result = await createMomentApi(parameters);
        contractAddress = result.contractAddress as Address;
      }

      const authHeaders = await getAuthHeaders();

      const { arweave_uri } = await buildMetadataPayload({
        name: "",
        description: "",
        externalUrl: `https://inprocess.world/collect/base:${contractAddress}/${moment.tokenId}`,
        image: "",
        animationUrl: "",
        mime: "",
        contentUri: "",
        authHeaders,
        getRecaptchaToken: async () => undefined,
      });

      await callUpdateMomentURI({
        moment,
        newUri: arweave_uri,
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
