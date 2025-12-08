"use client";

import { Media } from "../Media/Media";
import useCollectionData from "@/hooks/useCollectionData";
import useUpdateCollectionURI from "@/hooks/useUpdateCollectionURI";
import { Skeleton } from "@/components/ui/skeleton";
import { MomentMetadata } from "@/types/moment";
import SaveCollectionButton from "../CollectionManagePage/SaveCollectionButton";
import CollectionOwnerWarning from "../CollectionManagePage/CollectionOwnerWarning";

const CollectionMedia = () => {
  const { metadata, isOwner, isLoading } = useCollectionData();
  const { isLoading: isSaving } = useUpdateCollectionURI();

  return (
    <Media
      metadata={metadata as MomentMetadata}
      isOwner={isOwner}
      isLoading={isLoading}
      isSaving={isSaving}
      LoadingSkeleton={() => <Skeleton className="w-full h-[200px]" />}
      SaveButton={SaveCollectionButton}
      OwnerWarning={CollectionOwnerWarning}
    />
  );
};

export default CollectionMedia;
