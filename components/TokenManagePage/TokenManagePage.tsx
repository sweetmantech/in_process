"use client";

import { useState } from "react";
import Overview from "./Overview";
import AirdropProvider from "@/providers/AirdropProvider";
import Airdrop from "./Airdrop";
import ManageTabs, { MANAGE_TABS } from "./ManageTabs";
import Sale from "./Sale";
import { useTokensProvider } from "@/providers/TokensProvider";
import { useParams } from "next/navigation";
import { TokenProvider } from "@/providers/TokenProvider";
import { Address } from "viem";

const TokenManagePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(MANAGE_TABS.AIRDROP);
  const { collection, chainId } = useTokensProvider();
  const params = useParams();
  const tokenId = params.tokenId as string;

  return (
    <TokenProvider
      token={{
        tokenContractAddress: collection as Address,
        tokenId,
      }}
      chainId={chainId}
    >
      <Overview />
      <ManageTabs
        selectedTab={selectedTab}
        onChangeTab={(value: number) => setSelectedTab(value)}
      />
      <AirdropProvider>
        {selectedTab === MANAGE_TABS.AIRDROP && <Airdrop />}
        {selectedTab === MANAGE_TABS.SALE && <Sale />}
      </AirdropProvider>
    </TokenProvider>
  );
};

export default TokenManagePage;
