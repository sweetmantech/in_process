"use client";

import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { Address } from "viem";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const collection = params.collectionAddress as string;
  const { chainId, address } = parseCollectionAddress(collection);

  if (!address || !chainId) {
    return null;
  }

  return (
    <CollectionProvider
      collection={{
        address: address as Address,
        chainId,
      }}
    >
      {children}
    </CollectionProvider>
  );
};

export default RootLayout;
