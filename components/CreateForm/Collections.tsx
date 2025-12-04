"use client";

import { useState, useMemo } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCollections } from "@/hooks/useCollections";
import { useUserProvider } from "@/providers/UserProvider";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMetadata } from "@/hooks/useMetadata";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import { CollectionsResponse } from "@/lib/collections/fetchCollections";

type CollectionItem = CollectionsResponse["collections"][number];

const useSelectedCollectionDisplayName = (
  collections: CollectionItem[],
  selectedAddress: string
) => {
  const selectedCollection = collections.find((c) => c.address === selectedAddress);
  const { data: metadata } = useMetadata(selectedCollection?.uri || "");

  if (!selectedCollection) return "New Collection";
  return metadata?.name || selectedCollection.address;
};

const Collections = () => {
  const { artistWallet } = useUserProvider();
  const { collections, isLoading } = useCollections(artistWallet);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCollection = searchParams.get("collectionAddress") || "new";
  const [open, setOpen] = useState(false);

  const displayName = useSelectedCollectionDisplayName(collections, currentCollection);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "new") {
      params.delete("collectionAddress");
    } else {
      params.set("collectionAddress", value);
    }
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-start w-full gap-2">
      <Label htmlFor="collection" className="font-archivo text-md">
        collection
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="collection"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between !font-spectral !ring-0 !ring-offset-0 bg-white border-grey border rounded-[0px] h-9"
          >
            {displayName}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search collections..." className="font-spectral" />
            <CommandList>
              <CommandEmpty className="font-spectral">No collections found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="new"
                  onSelect={() => handleValueChange("new")}
                  className="font-spectral"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentCollection === "new" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  New Collection
                </CommandItem>
                {collections.map((collection) => (
                  <CollectionItem
                    key={collection.id}
                    collection={collection}
                    isSelected={currentCollection === collection.address}
                    onSelect={() => handleValueChange(collection.address)}
                  />
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface CollectionItemProps {
  collection: CollectionItem;
  isSelected: boolean;
  onSelect: () => void;
}

const CollectionItem = ({ collection, isSelected, onSelect }: CollectionItemProps) => {
  const { data: metadata, isLoading } = useMetadata(collection.uri);

  const displayName = metadata?.name || collection.address;
  const imageUrl = metadata?.image
    ? getFetchableUrl(metadata.image) || "/images/placeholder.png"
    : "/images/placeholder.png";

  return (
    <CommandItem
      value={collection.address}
      onSelect={onSelect}
      className="font-spectral"
      keywords={[displayName, collection.address]}
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

export default Collections;

