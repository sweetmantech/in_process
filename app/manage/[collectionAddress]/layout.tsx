"use client";

import { useParams } from "next/navigation";
import * as chains from "viem/chains";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { ReactNode } from "react";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { Address } from "viem";
import { MomentMetadataProvider } from "@/providers/MomentMetadataProvider";
import { MomentFormProvider } from "@/providers/MomentFormProvider";

const RootLayout = ({ children }: { children: ReactNode }) => {
  const params = useParams();
  const collection = params.collectionAddress as string;
  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];
  return (
    <CollectionProvider
      collection={{
        address: address as Address,
        chainId: viemChain.id,
      }}
    >
      <MomentFormProvider>
        <MomentMetadataProvider>{children}</MomentMetadataProvider>
      </MomentFormProvider>
    </CollectionProvider>
  );
};

export default RootLayout;
