"use client";

import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { Address } from "viem";
import { MomentMetadataProvider } from "@/providers/MomentMetadataProvider";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";

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
      <MetadataFormProvider>
        <MomentMetadataProvider>{children}</MomentMetadataProvider>
      </MetadataFormProvider>
    </CollectionProvider>
  );
};

export default RootLayout;
