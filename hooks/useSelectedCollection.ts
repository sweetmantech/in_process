import { useMemo } from "react";
import { CollectionItem } from "@/types/collections";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

export const useSelectedCollection = (
  collections: CollectionItem[],
  selectedAddress: string
): { displayName: string; imageUrl: string; isLoading: boolean } => {
  const selectedCollection = collections.find((c) => c.address === selectedAddress);

  const { data: metadata, isLoading } = useMetadata(selectedCollection?.uri || "");

  const displayName = useMemo(() => {
    if (!selectedCollection) return "New Collection";
    return selectedCollection.name || selectedCollection.address;
  }, [selectedCollection]);

  const imageUrl = useMemo(() => {
    if (!selectedCollection) return "/images/placeholder.png";
    return metadata?.image
      ? getFetchableUrl(metadata.image) || "/images/placeholder.png"
      : "/images/placeholder.png";
  }, [selectedCollection, metadata?.image]);

  return { displayName, imageUrl, isLoading };
};
