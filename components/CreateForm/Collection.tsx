"use client";

import { SelectItem } from "@/components/ui/select";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import { CollectionsResponse } from "@/lib/collections/fetchCollections";

type CollectionItem = CollectionsResponse["collections"][number];

interface CollectionProps {
  collection: CollectionItem;
}

const Collection = ({ collection }: CollectionProps) => {
  const { data: metadata, isLoading } = useMetadata(collection.uri);

  if (isLoading) {
    return (
      <SelectItem value={collection.address} className="font-spectral">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-neutral-200 animate-pulse" />
          <span>Loading...</span>
        </div>
      </SelectItem>
    );
  }

  const displayName = metadata?.name || collection.address;
  const imageUrl = metadata?.image ? getFetchableUrl(metadata.image) || "/images/placeholder.png" : "/images/placeholder.png";

  return (
    <SelectItem value={collection.address} className="font-spectral">
      <div className="flex items-center gap-2">
        <Image
          src={imageUrl}
          alt={displayName}
          width={32}
          height={32}
          className="rounded object-cover"
          unoptimized
        />
        <span>{displayName}</span>
      </div>
    </SelectItem>
  );
};

export default Collection;

