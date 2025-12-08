"use client";

import Moments from "./Moments";
import CollectionOverview from "./CollectionOverview";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useParams } from "next/navigation";

const CollectionManagePage = () => {
  const params = useParams();
  const collection = params.collectionAddress as string;
  if (!collection) return null;

  return (
    <>
      <CollectionOverview />
      <TimelineProvider collection={collection}>
        <Moments />
      </TimelineProvider>
    </>
  );
};

export default CollectionManagePage;
