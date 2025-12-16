"use client";

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
import { useCollectionsSelection } from "@/hooks/useCollectionsSelection";
import CollectionListItem from "./CollectionItem";
import Image from "next/image";
import Spinner from "../ui/spinner";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import { useUserProvider } from "@/providers/UserProvider";

const Collections = () => {
  const { isPrepared } = useUserProvider();
  const { collections, isLoading: isCollectionsLoading } = useCollectionsProvider();
  const { currentCollection, open, setOpen, displayName, imageUrl, isLoading, handleValueChange } =
    useCollectionsSelection();
  const { openModal } = useCreateCollectionModalTriggerProvider();

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isPrepared()) {
      return;
    }
    setOpen(newOpen);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <Label htmlFor="collection" className="text-md font-archivo">
        collection
      </Label>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="collection"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-9 w-full justify-between rounded-[0px] border border-grey bg-white !font-spectral !ring-0 !ring-offset-0"
          >
            <div className="flex items-center gap-2">
              {isLoading || !currentCollection ? (
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
                  onSelect={() => {
                    setOpen(false);
                    openModal();
                  }}
                  className="border-b border-grey font-spectral"
                  keywords={["new", "collection"]}
                >
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  New Collection
                </CommandItem>
              </CommandGroup>
              <CommandGroup>
                {isCollectionsLoading ? (
                  <div className="flex items-center justify-center py-2">
                    <Spinner className="size-4" />
                  </div>
                ) : (
                  collections.map((collection) => (
                    <CollectionListItem
                      key={collection.id}
                      collection={collection}
                      isSelected={currentCollection === collection.address}
                      onSelect={() => handleValueChange(collection.address)}
                    />
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Collections;
