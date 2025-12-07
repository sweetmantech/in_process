"use client";

import Token from "./Token";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { MomentProvider } from "@/providers/MomentProvider";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentCollectProvider } from "@/providers/MomentCollectProvider";
import { useParams } from "next/navigation";
import { Address } from "viem";
import * as chains from "viem/chains";

const TokenPage = () => {
  const params = useParams();
  const collection = params.collection as string;
  const tokenId = params.tokenId as string;

  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  return (
    <main className="flex w-screen grow">
      <div className="flex w-full flex-col items-center justify-center pt-12 md:pt-14">
        <MomentProvider
          moment={{
            collectionAddress: address as Address,
            tokenId,
            chainId: viemChain.id,
          }}
        >
          <MomentCommentsProvider>
            <MomentCollectProvider>
              <Token />
            </MomentCollectProvider>
          </MomentCommentsProvider>
        </MomentProvider>
      </div>
    </main>
  );
};

export default TokenPage;
