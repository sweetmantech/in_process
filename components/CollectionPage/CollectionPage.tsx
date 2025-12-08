"use client";

import AltToggle from "../ArtistPage/AltToggle";
import { useState } from "react";
import CollectionInfo from "./CollectionInfo";
import MomentsTimeline from "../Timeline/MomentsTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { useCollectionAddressParams } from "@/hooks/useCollectionAddressParams";
import { Address } from "viem";

const CollectionPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("timeline");
  const { address, chainId } = useCollectionAddressParams();

  if (!address || !chainId) {
    return null;
  }

  return (
    <CollectionProvider collection={{ address: address as Address, chainId }}>
      <div className="overflow-hidden w-screen grow flex flex-col pb-20 pt-6 md:pt-10 relative min-h-[450px] md:min-h-[550px]">
        <div className="relative flex justify-between px-2 md:px-10 items-start pb-2">
          <CollectionInfo />
          <AltToggle alt={alt} setAlt={setAlt} />
        </div>
        <div
          className={`grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
        >
          <TimelineProvider collectionAddress={address as Address}>
            <MomentsTimeline alt={alt} />
          </TimelineProvider>
        </div>
      </div>
    </CollectionProvider>
  );
};

export default CollectionPage;
