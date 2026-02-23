import { useState } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { callUpdateCollectionURI } from "@/lib/collection/callUpdateCollectionURI";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { Address } from "viem";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { migrateMuxToArweaveApi } from "@/lib/mux/migrateMuxToArweaveApi";

const useUpdateCollectionURI = () => {
  const { data: collection } = useCollectionProvider();
  const { name, mimeType } = useMetadataFormProvider();
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

      // Use existing metadata generation, merging with existing metadata
      const existingMetadata = collection.metadata ?? null;
      const newUri = await generateMetadataUri(existingMetadata);

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

      if (mimeType.includes("video")) {
        await migrateMuxToArweaveApi(
          {
            collectionAddress: collection.address as Address,
            tokenId: "0",
            chainId: collection.chain_id,
          },
          accessToken
        );
      }
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
