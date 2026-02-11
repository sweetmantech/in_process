"use client";

import { useState, Fragment } from "react";
import Moments from "@/components/MomentsGrid/Moments";
import CollectionOverview from "../Overview/CollectionOverview";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { useParams } from "next/navigation";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import CollectionMedia from "../Media/CollectionMedia";
import { MetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import Tabs, { COLLECTION_MANAGE_TABS } from "./Tabs";
import Admins from "./Admins";

const CollectionManagePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(COLLECTION_MANAGE_TABS.MEDIA);
  const params = useParams();
  const collection = params.collectionAddress as string;

  if (!collection) return <Fragment />;

  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <CollectionOverview />
        <Tabs selectedTab={selectedTab} onChangeTab={(value: number) => setSelectedTab(value)} />
        <div className="px-2 md:px-10">
          {selectedTab === COLLECTION_MANAGE_TABS.MEDIA && <CollectionMedia />}
          {selectedTab === COLLECTION_MANAGE_TABS.ADMINS && <Admins />}
        </div>
        <div className="px-4 md:px-10 pt-6 pb-4">
          <h2 className="text-xl font-semibold">Moments</h2>
        </div>
        <TimelineProvider collection={collection} includeHidden={true}>
          <Moments variant="moment" />
        </TimelineProvider>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default CollectionManagePage;
