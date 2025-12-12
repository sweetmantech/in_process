import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useSelectedCollection } from "@/hooks/useSelectedCollection";

export const useCollectionsSelection = () => {
  const { collections, isLoading: isCollectionsLoading } = useCollectionsProvider();
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

  return {
    collections,
    currentCollection,
    open,
    setOpen,
    displayName,
    imageUrl,
    isLoading,
    handleValueChange,
    isCollectionsLoading,
  };
};
