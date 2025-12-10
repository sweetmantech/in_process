"use client";

import { Media } from "../Media/Media";
import useIsCollectionOwner from "@/hooks/useIsCollectionOwner";
import useUpdateCollectionURI from "@/hooks/useUpdateCollectionURI";
import { MomentMetadata } from "@/types/moment";
import SaveCollectionButton from "../CollectionManagePage/SaveCollectionButton";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const CollectionMedia = () => {
  const { data: collection, isLoading } = useCollectionProvider();
  const isOwner = useIsCollectionOwner();
  const metadata = collection?.metadata ?? null;
  const { isLoading: isSaving } = useUpdateCollectionURI();

  return (
    <Media
      metadata={metadata as MomentMetadata}
      isOwner={isOwner}
      isLoading={isLoading}
      isSaving={isSaving}
      SaveButton={SaveCollectionButton}
    />
  );
};

export default CollectionMedia;
