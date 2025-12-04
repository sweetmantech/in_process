import { useMemo } from "react";
import type { CollectionItem } from "@/types/collections";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

export const useCollectionItem = (
  collection: CollectionItem
): { displayName: string; imageUrl: string; isLoading: boolean } => {
  const { data: metadata, isLoading } = useMetadata(collection.uri);

  const displayName = useMemo(() => {
    return collection.name || collection.address;
  }, [collection.name, collection.address]);

  const imageUrl = useMemo(() => {
    return metadata?.image
      ? getFetchableUrl(metadata.image) || "/images/placeholder.png"
      : "/images/placeholder.png";
  }, [metadata?.image]);

  return { displayName, imageUrl, isLoading };
};
