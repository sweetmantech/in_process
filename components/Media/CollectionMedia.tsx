"use client";

import { Media } from "../Media/Media";
import useCollectionData from "@/hooks/useCollectionData";
import useUpdateCollectionURI from "@/hooks/useUpdateCollectionURI";
import { MomentMetadata } from "@/types/moment";
import SaveCollectionButton from "../CollectionManagePage/SaveCollectionButton";

const CollectionMedia = () => {
  const { metadata, isOwner, isLoading } = useCollectionData();
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
