import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSelectedCollection } from "@/hooks/useSelectedCollection";

export const useCollectionsSelection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const collectionAddress = searchParams.get("collectionAddress");
  const currentCollection = collectionAddress || null;
  const [open, setOpen] = useState(false);

  const { displayName, imageUrl, isLoading } = useSelectedCollection(currentCollection);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("collectionAddress", value);
    } else {
      params.delete("collectionAddress");
    }
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return {
    currentCollection,
    open,
    setOpen,
    displayName,
    imageUrl,
    isLoading,
    handleValueChange,
  };
};
