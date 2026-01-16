"use client";

import Moments from "./Moments";
import CollectionOverview from "../Overview/CollectionOverview";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useParams } from "next/navigation";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import CollectionMedia from "../Media/CollectionMedia";
import { MetadataUploadProvider } from "@/providers/MetadataUploadProvider";

const CollectionManagePage = () => {
  const params = useParams();
  const collection = params.collectionAddress as string;

  if (!collection) return null;

  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <CollectionOverview />
        <div className="md:px-10 px-4">
          <CollectionMedia />
        </div>
        <TimelineProvider collection={collection} includeHidden={true}>
          <Moments />
        </TimelineProvider>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default CollectionManagePage;
