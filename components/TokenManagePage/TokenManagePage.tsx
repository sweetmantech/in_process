"use client";

import { useState } from "react";
import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "./Airdrop";
import ManageTabs, { MANAGE_TABS } from "./ManageTabs";
import Sale from "./Sale";
import Media from "./Media";
import { useParams } from "next/navigation";
import { TokenProvider } from "@/providers/TokenProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";

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
      <ManageTabs
        selectedTab={selectedTab}
        onChangeTab={(value: number) => setSelectedTab(value)}
      />
      <AirdropProvider>
        {selectedTab === MANAGE_TABS.AIRDROP && <Airdrop />}
        {selectedTab === MANAGE_TABS.SALE && <Sale />}
        {selectedTab === MANAGE_TABS.MEDIA && <Media />}
      </AirdropProvider>
    </TokenProvider>
  );
};

export default TokenManagePage;
