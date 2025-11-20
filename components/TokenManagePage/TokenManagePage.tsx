"use client";

import { useState } from "react";
import ManageTabs, { MANAGE_TABS } from "./ManageTabs";
import Sale from "./Sale";
import Media from "./Media";
import { useParams } from "next/navigation";
import { TokenProvider } from "@/providers/TokenProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import TokenOverview from "../CollectionManagePage/TokenOverview";
import MomentAirdrop from "../MomentAirdrop";
import { Address } from "viem";

const TokenManagePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(MANAGE_TABS.AIRDROP);
  const { collection } = useCollectionProvider();
  const params = useParams();
  const tokenId = params.tokenId as string;

  return (
    <TokenProvider
      token={{
        tokenContractAddress: collection.address,
        tokenId,
      }}
      chainId={collection.chainId}
    >
      <TokenOverview />
      <ManageTabs
        selectedTab={selectedTab}
        onChangeTab={(value: number) => setSelectedTab(value)}
      />
      <div className="px-4 md:px-10">
        {selectedTab === MANAGE_TABS.AIRDROP && (
          <MomentAirdrop momentContract={collection.address as Address} tokenId={tokenId} />
        )}
        {selectedTab === MANAGE_TABS.SALE && <Sale />}
        {selectedTab === MANAGE_TABS.MEDIA && <Media />}
      </div>
    </TokenProvider>
  );
};

export default TokenManagePage;
