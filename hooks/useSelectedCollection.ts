import { useMemo } from "react";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";

export const useSelectedCollection = (
  selectedAddress: string
): { displayName: string; imageUrl: string; isLoading: boolean } => {
  const { collections } = useCollectionsProvider();
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
