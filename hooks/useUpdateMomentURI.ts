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
import { useRouter } from "next/navigation";
import { CHAIN_ID } from "@/lib/consts";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";

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
  const { push } = useRouter();

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
    const shouldChangeCollection = selectedCollection !== moment.collectionAddress;
    let contractAddress = moment.collectionAddress;

    try {
      setIsLoading(true);
      if (!name) {
        throw new Error("Missing token name");
      }

      const existingMetadata = metadata ?? null;
      let newUri = await generateMetadataUri(existingMetadata);

      const authHeaders = await getAuthHeaders();

      if (shouldChangeCollection) {
        const parameters = createParameters(newUri);
        const result = await createMomentApi(parameters);
        contractAddress = result.contractAddress as Address;

        const { arweave_uri } = await buildMetadataPayload({
          name: "",
          description: "",
          externalUrl: `https://inprocess.world/collect/base:${contractAddress}/${moment.tokenId}`,
          image: "",
          animationUrl: "",
          mime: "",
          contentUri: "",
          authHeaders,
        });
        newUri = arweave_uri;
      }

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
      push(`/manage/${getShortNameFromChainId(CHAIN_ID)}:${contractAddress}/${moment.tokenId}`);
    }
  };

  return {
    updateTokenURI,
    isLoading,
  };
};

export default useUpdateMomentURI;
