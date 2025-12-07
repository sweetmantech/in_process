"use client";

import { Check } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { CollectionItem } from "@/types/collections";
import { useCollectionItem } from "@/hooks/useCollectionItem";

interface CollectionItemProps {
  collection: CollectionItem;
  isSelected: boolean;
  onSelect: () => void;
}

const CollectionListItem = ({ collection, isSelected, onSelect }: CollectionItemProps) => {
  const { displayName, imageUrl, isLoading } = useCollectionItem(collection);

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
          <div className="h-[24px] w-[24px] animate-pulse rounded bg-neutral-200" />
        ) : (
          <div className="h-[24px] w-[24px] shrink-0 overflow-hidden rounded">
            <Image
              src={imageUrl}
              alt={displayName}
              width={30}
              height={30}
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>
        )}
        <span>{displayName}</span>
      </div>
    </CommandItem>
  );
};

export default CollectionListItem;
