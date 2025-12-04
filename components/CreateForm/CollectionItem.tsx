"use client";

import { Check } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import { CollectionsResponse } from "@/types/collections";

type CollectionItem = CollectionsResponse["collections"][number];

interface CollectionItemProps {
  collection: CollectionItem;
  isSelected: boolean;
  onSelect: () => void;
}

const CollectionItem = ({ collection, isSelected, onSelect }: CollectionItemProps) => {
  const { data: metadata, isLoading } = useMetadata(collection.uri);

  const displayName = collection.name || collection.address;
  const imageUrl = metadata?.image
    ? getFetchableUrl(metadata.image) || "/images/placeholder.png"
    : "/images/placeholder.png";

  return (
    <CommandItem
      value={collection.address}
      onSelect={onSelect}
      className="font-spectral"
      keywords={[collection.name, collection.address]}
    >
      <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
      <div className="flex items-center gap-2">
        {isLoading ? (
          <div className="h-8 w-8 rounded bg-neutral-200 animate-pulse" />
        ) : (
          <Image
            src={imageUrl}
            alt={displayName}
            width={32}
            height={32}
            className="rounded object-cover"
            unoptimized
          />
        )}
        <span>{displayName}</span>
      </div>
    </CommandItem>
  );
};

export default CollectionItem;
