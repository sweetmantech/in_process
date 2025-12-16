import { useState, useCallback } from "react";
import { Address } from "viem";
import { usePrivy } from "@privy-io/react-auth";
import { useQueryClient } from "@tanstack/react-query";
import { uploadJson } from "@/lib/arweave/uploadJson";
import { uploadFilesToArweave } from "@/lib/metadata/uploadFilesToArweave";
import { toast } from "sonner";
import { useUserProvider } from "@/providers/UserProvider";
import { useCollectionsSelection } from "@/hooks/useCollectionsSelection";
import { useCollectionFormProvider } from "@/providers/CollectionFormProvider";
import { CHAIN_ID } from "@/lib/consts";
import { callCreateCollectionApi } from "@/lib/collections/callCreateCollectionApi";
import type { CollectionsResponse } from "@/types/collections";

export const useCollectionCreate = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { getAccessToken } = usePrivy();
  const { artistWallet } = useUserProvider();
  const { handleValueChange } = useCollectionsSelection();
  const queryClient = useQueryClient();
  const { name, imageFile, resetForm, setIsCreateModalOpen } = useCollectionFormProvider();

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
    setUploadProgress(0);

    try {
      // Upload image to Arweave
      const imageUploadResult = await uploadFilesToArweave(
        null, // previewFile
        imageFile, // imageFile
        null, // animationFile
        "", // existingAnimationUrl
        setUploadProgress,
        imageFile.type
      );

      const imageUri = imageUploadResult.image;
      if (!imageUri) {
        throw new Error("Failed to upload collection image");
      }

      // Create collection metadata JSON
      const metadata = {
        name,
        image: imageUri,
        description: "",
      };

      // Upload metadata JSON to Arweave
      setUploadProgress(50);
      const metadataUri = await uploadJson(metadata);
      setUploadProgress(75);

      // Call API to create collection
      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      const result = await callCreateCollectionApi(accessToken, {
        account: artistWallet,
        uri: metadataUri,
        name,
      });
      setUploadProgress(100);

      toast.success("Collection created successfully");
      return {
        contractAddress: result.contractAddress as Address,
        metadataUri,
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
    if (result && artistWallet) {
      const { contractAddress, metadataUri } = result;

      // Update query cache with the new collection
      const queryKey = ["collections", artistWallet];
      queryClient.setQueryData<CollectionsResponse>(queryKey, (oldData) => {
        if (!oldData) {
          return {
            status: "success",
            collections: [],
            pagination: { page: 1, limit: 100, total_pages: 1 },
          };
        }

        // Create new collection item
        const newCollection = {
          id: Date.now().toString(), // Temporary ID, will be replaced on next fetch
          address: contractAddress,
          chain_id: CHAIN_ID,
          uri: metadataUri,
          name: name.trim(),
          created_at: new Date().toISOString(),
          default_admin: {
            username: null,
            address: artistWallet,
          },
        };

        // Add new collection to the beginning of the array
        return {
          ...oldData,
          collections: [newCollection, ...oldData.collections],
        };
      });

      // Select the newly created collection
      handleValueChange(contractAddress);
      resetForm();
      setIsCreateModalOpen(false);
    }
  }, [
    createCollection,
    artistWallet,
    queryClient,
    name,
    handleValueChange,
    resetForm,
    setIsCreateModalOpen,
  ]);

  return {
    createCollection,
    handleSubmit,
    isCreating,
    uploadProgress,
  };
};
