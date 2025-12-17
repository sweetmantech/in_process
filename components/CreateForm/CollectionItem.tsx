"use client";

import { Check } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import CollectionImage from "@/components/CollectionImage";
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
          <div className="h-10 w-10 animate-pulse rounded bg-neutral-200" />
        ) : (
          <CollectionImage src={imageUrl} alt={displayName} />
        )}
        <span>{displayName}</span>
      </div>
    </CommandItem>
  );
};

export default CollectionListItem;
