import { useMemo } from "react";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";

export const useSelectedCollection = (
  selectedAddress: string | null
): { displayName: string; imageUrl: string; isLoading: boolean } => {
  const { collections } = useCollectionsProvider();
  const selectedCollection = selectedAddress
    ? collections.find((c) => c.address === selectedAddress)
    : null;

  const { data: metadata, isLoading } = useMetadata(selectedCollection?.uri || "");

  const displayName = useMemo(() => {
    if (!selectedAddress) return "Please select a collection";
    if (!selectedCollection) return "Please select a collection";
    return selectedCollection.name || selectedCollection.address;
  }, [selectedAddress, selectedCollection]);

  const imageUrl = useMemo(() => {
    if (!selectedCollection) return "/images/placeholder.png";
    return metadata?.image
      ? getFetchableUrl(metadata.image) || "/images/placeholder.png"
      : "/images/placeholder.png";
  }, [selectedCollection, metadata?.image]);

  return { displayName, imageUrl, isLoading };
};
