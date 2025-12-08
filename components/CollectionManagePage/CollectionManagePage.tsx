"use client";

import Moments from "./Moments";
import CollectionOverview from "../Overview/CollectionOverview";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useParams } from "next/navigation";
import { CollectionFormProvider } from "@/providers/CollectionFormProvider";
import CollectionMedia from "./CollectionMedia";

const CollectionManagePage = () => {
  const params = useParams();
  const collection = params.collectionAddress as string;

  if (!collection) return null;

  return (
    <CollectionFormProvider>
      <CollectionOverview />
      <CollectionMedia />
      <TimelineProvider collection={collection}>
        <Moments />
      </TimelineProvider>
    </CollectionFormProvider>
  );
};

export default CollectionManagePage;
