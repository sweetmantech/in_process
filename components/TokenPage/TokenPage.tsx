"use client";

import Token from "./Token";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { TokenProvider } from "@/providers/TokenProvider";
import { ZoraMintCommentProvider } from "@/providers/ZoraMintCommentProvider";
import { useParams } from "next/navigation";
import { Address } from "viem";
import * as chains from "viem/chains";

const TokenPage = () => {
  const params = useParams();
  const collection = params.collection as string;
  const tokenId = params.tokenId as string;
  // eslint-disable-next-line
  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  return (
    <main className="w-screen flex grow">
      <div className="w-full flex flex-col items-center justify-center pt-12 md:pt-14">
        <TokenProvider
          token={{
            tokenContractAddress: address as Address,
            tokenId,
            chainId: viemChain.id,
          }}
          chainId={viemChain.id}
        >
          <ZoraMintCommentProvider>
            <Token />
          </ZoraMintCommentProvider>
        </TokenProvider>
      </div>
    </main>
  );
};

export default TokenPage;
