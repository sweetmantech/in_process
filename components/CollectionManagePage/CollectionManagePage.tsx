"use client";

import Moments from "./Moments";
import CollectionOverview from "./CollectionOverview";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Address } from "viem";

const CollectionManagePage = () => {
  const { data } = useCollectionProvider();
  return (
    <>
      <CollectionOverview />
      <TimelineProvider collectionAddress={data?.address as Address}>
        <Moments />
      </TimelineProvider>
    </>
  );
};

export default CollectionManagePage;
