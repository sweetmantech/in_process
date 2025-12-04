"use client";

import { useState } from "react";
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
import { useSelectedCollection } from "@/hooks/useSelectedCollection";
import CollectionItem from "./CollectionItem";
import Image from "next/image";

const Collections = () => {
  const { artistWallet } = useUserProvider();
  const { collections } = useCollections(artistWallet);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCollection = searchParams.get("collectionAddress") || "new";
  const [open, setOpen] = useState(false);

  const { displayName, imageUrl, isLoading } = useSelectedCollection(
    collections,
    currentCollection
  );

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
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="h-[24px] w-[24px] rounded bg-neutral-200 animate-pulse" />
              ) : (
                <div className="h-[24px] w-[24px] rounded overflow-hidden shrink-0">
                  <Image
                    src={imageUrl}
                    alt={displayName}
                    width={30}
                    height={30}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
              )}
              <span>{displayName}</span>
            </div>
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
                  className="font-spectral border-b border-grey"
                  keywords={["new", "collection"]}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentCollection === "new" ? "opacity-100" : "opacity-0"
                    )}
                  />
                  New Collection
                </CommandItem>
              </CommandGroup>
              <CommandGroup>
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

export default Collections;
