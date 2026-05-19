import { useState, useCallback } from "react";
import { Address } from "viem";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { useUserProvider } from "@/providers/UserProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import { callCreateCollectionApi } from "@/lib/collection/callCreateCollectionApi";
import useCreateCollectionParameters from "./useCreateCollectionParameters";

export const useCreateCollection = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { getAccessToken } = usePrivy();
  const { artistWallet } = useUserProvider();
  const { setSelectedCollection } = useCollectionsProvider();
  const { name, imageFile, resetForm } = useMetadataFormProvider();
  const { closeModal } = useCreateCollectionModalTriggerProvider();
  const { fetchParameters } = useCreateCollectionParameters();

  const createCollection = useCallback(async (): Promise<{
    contractAddress: Address;
    metadataUri: string;
  } | null> => {
    if (!name.trim()) {
      toast.error("Collection name is required");
      return null;
    }

    if (!imageFile) {
      toast.error("Collection image is required");
      return null;
    }

    if (!artistWallet) {
      toast.error("Please connect your artist wallet");
      return null;
    }

    setIsCreating(true);
    const parameters = await fetchParameters();
    if (!parameters) {
      throw new Error("Parameters not ready");
    }
    try {
      const result = await callCreateCollectionApi(parameters);
      toast.success("Collection created successfully");
      return {
        contractAddress: result.contractAddress as Address,
        metadataUri: parameters.uri,
      };
    } catch (error: any) {
      console.error("Error creating collection:", error);
      toast.error(error?.message || "Failed to create collection");
      return null;
    } finally {
      setIsCreating(false);
      setUploadProgress(0);
    }
  }, [name, imageFile, artistWallet, getAccessToken]);

  const handleSubmit = useCallback(async () => {
    const result = await createCollection();
    if (!result) return;
    setSelectedCollection(result.contractAddress.toLowerCase());
    resetForm();
    closeModal();
  }, [createCollection, setSelectedCollection, resetForm, closeModal]);

  return {
    createCollection,
    handleSubmit,
    isCreating,
    uploadProgress,
  };
};
