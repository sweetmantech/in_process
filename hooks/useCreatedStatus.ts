"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export const useCreatedStatus = () => {
  const [createdContract, setCreatedContract] = useState<string>("");
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const updateUrlWithCollectionAddress = (collectionAddress: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("collectionAddress", collectionAddress);
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    updateUrlWithCollectionAddress,
    createdContract,
    setCreatedContract,
    createdTokenId,
    setCreatedTokenId,
  };
};
