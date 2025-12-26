"use client";

import { Fragment, useState } from "react";
import ManageTabs, { MANAGE_TABS } from "./ManageTabs";
import Sale from "./Sale";
import MomentMedia from "../Media/MomentMedia";
import { useParams } from "next/navigation";
import { MomentProvider } from "@/providers/MomentProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import MomentOverview from "../Overview/MomentOverview";
import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import { MetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { MomentAdminsProvider } from "@/providers/MomentAdminsProvider";
import Admins from "./Admins";

const MomentManagePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(MANAGE_TABS.AIRDROP);
  const { data } = useCollectionProvider();
  const params = useParams();
  const tokenId = params.tokenId as string;

  if (!data) return <Fragment />;

  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <MomentProvider
          moment={{
            collectionAddress: data.address as Address,
            tokenId,
            chainId: data.chain_id,
          }}
        >
          <MomentOverview />
          <ManageTabs
            selectedTab={selectedTab}
            onChangeTab={(value: number) => setSelectedTab(value)}
          />
          <div className="px-4 md:px-10">
            {selectedTab === MANAGE_TABS.AIRDROP && <MomentAirdrop />}
            {selectedTab === MANAGE_TABS.SALE && <Sale />}
            {selectedTab === MANAGE_TABS.MEDIA && <MomentMedia />}
            {selectedTab === MANAGE_TABS.ADMIN && (
              <MomentAdminsProvider>
                <Admins />
              </MomentAdminsProvider>
            )}
          </div>
        </MomentProvider>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default MomentManagePage;
