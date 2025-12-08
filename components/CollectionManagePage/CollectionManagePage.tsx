"use client";

import Moments from "./Moments";
import CollectionOverview from "../Overview/CollectionOverview";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useParams } from "next/navigation";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import CollectionMedia from "../Media/CollectionMedia";

const CollectionManagePage = () => {
  const params = useParams();
  const collection = params.collectionAddress as string;

  if (!collection) return null;

  return (
    <MetadataFormProvider>
      <CollectionOverview />
      <CollectionMedia />
      <TimelineProvider collection={collection}>
        <Moments />
      </TimelineProvider>
    </MetadataFormProvider>
  );
};

export default CollectionManagePage;
