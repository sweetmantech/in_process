"use client";

import AltToggle from "../ArtistPage/AltToggle";
import { useState } from "react";
import CollectionInfo from "./CollectionInfo";
import { useParams } from "next/navigation";
import CollectionTimeline from "./CollectionTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import * as chains from "viem/chains";
import { Address } from "viem";

const CollectionPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const params = useParams();
  const collectionAddress = params.collectionAddress as string;
  // eslint-disable-next-line
  const [chain, address] = collectionAddress.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  return (
    <CollectionProvider collection={{ address: address as Address, chainId: viemChain.id }}>
      <div className="overflow-hidden w-screen grow flex flex-col pb-20 pt-6 md:pt-10 relative min-h-[450px] md:min-h-[550px]">
        <div className="relative flex justify-between px-2 md:px-10 items-start pb-2">
          <CollectionInfo />
          <AltToggle alt={alt} setAlt={setAlt} />
        </div>
        <div
          className={`grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
        >
          <TimelineProvider collectionAddress={address}>
            <CollectionTimeline alt={alt} />
          </TimelineProvider>
        </div>
      </div>
    </CollectionProvider>
  );
};

export default CollectionPage;
