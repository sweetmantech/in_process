import { useState } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { callUpdateCollectionURI } from "@/lib/collection/callUpdateCollectionURI";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { Address } from "viem";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";

const useUpdateCollectionURI = () => {
  const { data: collection, refetch } = useCollectionProvider();
  const { name, setDescription } = useMetadataFormProvider();
  const { getAccessToken } = usePrivy();
  const { generateMetadataUri } = useMetadataUploadProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateCollectionURI = async () => {
    setIsLoading(true);
    try {
      if (!name) {
        throw new Error("Missing collection name");
      }

      if (!collection) {
        throw new Error("Collection not found");
      }

      // Use existing metadata generation
      const newUri = await generateMetadataUri();

      const accessToken = await getAccessToken();
      if (!accessToken) {
        throw new Error("Authentication required");
      }

      await callUpdateCollectionURI({
        collection: {
          address: collection.address as Address,
          chainId: collection.chain_id,
        },
        newCollectionName: name,
        newUri,
        accessToken,
      });

      // Reset description state after successful save
      setDescription("");

      // Fetch updated metadata
      refetch();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to update collection metadata");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCollectionURI,
    isLoading,
  };
};

export default useUpdateCollectionURI;
