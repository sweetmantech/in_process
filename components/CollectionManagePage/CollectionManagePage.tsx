"use client";

import { TokensProvider } from "@/providers/TokensProvider";
import { useParams } from "next/navigation";
import Tokens from "./Tokens";
import * as chains from "viem/chains";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import Overview from "./Overview";

const CollectionManagePage = () => {
  const params = useParams();
  const collection = params.collectionAddress as string;
  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  return (
    <TokensProvider
      collections={[
        {
          newContract: address,
          chainId: viemChain.id,
        },
      ]}
    >
      <Overview />
      <Tokens />
    </TokensProvider>
  );
};

export default CollectionManagePage;
