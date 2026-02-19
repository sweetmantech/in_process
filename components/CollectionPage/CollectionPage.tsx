"use client";

import AltToggle from "../ArtistPage/AltToggle";
import { useState } from "react";
import CollectionInfo from "./CollectionInfo";
import MomentsTimeline from "../Timeline/MomentsTimeline";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { CollectionProvider } from "@/providers/CollectionProvider";
import { Address } from "viem";
import { useParams } from "next/navigation";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

const CollectionPage = () => {
  const [alt, setAlt] = useState<"timeline" | "grid">("grid");
  const params = useParams();
  const collection = params.collectionAddress as string | undefined;
  const { chainId, address } = parseCollectionAddress(collection);

  if (!collection || !address || !chainId) {
    return null;
  }

  return (
    <CollectionProvider collection={{ address: address as Address, chainId }}>
      <div className="overflow-hidden w-screen grow flex flex-col pb-20 pt-6 md:pt-10 relative min-h-[450px] md:min-h-[550px]">
        <div className="relative flex justify-between px-2 md:px-10 items-start pb-4 md:pb-8">
          <CollectionInfo />
          <AltToggle alt={alt} setAlt={setAlt} />
        </div>
        <div
          className={`grow flex flex-col px-2 md:px-0 ${alt === "timeline" && "md:pt-20 md:px-10"}`}
        >
          <TimelineProvider collection={collection}>
            <MomentsTimeline alt={alt} />
          </TimelineProvider>
        </div>
      </div>
    </CollectionProvider>
  );
};

export default CollectionPage;
