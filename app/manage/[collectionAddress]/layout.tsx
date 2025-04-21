"use client";

import { useParams } from "next/navigation";
import * as chains from "viem/chains";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { ReactNode } from "react";
import { TokensProvider } from "@/providers/TokensProvider";

const RootLayout = ({ children }: { children: ReactNode }) => {
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
          tokenId: 1,
        },
      ]}
    >
      {children}
    </TokensProvider>
  );
};

export default RootLayout;
