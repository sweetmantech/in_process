import { useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSelectedCollection } from "@/hooks/useSelectedCollection";

export const useCollectionsSelection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentCollection = searchParams.get("collectionAddress") || "new";
  const [open, setOpen] = useState(false);

  const { displayName, imageUrl, isLoading } = useSelectedCollection(currentCollection);

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
    currentCollection,
    open,
    setOpen,
    displayName,
    imageUrl,
    isLoading,
    handleValueChange,
  };
};
