"use client";

import Token from "@/components/Token";
import { Address } from "viem";
import * as chains from "viem/chains";
import { TokenProvider } from "@/providers/TokenProvider";
import { getTokensOfContract } from "@/lib/viem/getTokensOfContract";
import { useQuery } from "@tanstack/react-query";
import { ZoraMintCommentProvider } from "@/providers/ZoraMintCommentProvider";
import Loading from "../Loading";
import { useParams } from "next/navigation";
import { ZORA_TO_VIEM, ZoraChains } from "@/lib/zora/zoraToViem";
import { CollectionProvider } from "@/providers/CollectionProvider";

const TokenPage = () => {
  const params = useParams();
  const collection = params.collection as string;
  const tokenId = params.tokenId as string;
  const [chain, address] = collection.split("%3A");
  const viemChainName = ZORA_TO_VIEM[chain as ZoraChains];
  const viemChain = chains[viemChainName];

  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ["tokens", viemChain.id, address],
    queryFn: () => getTokensOfContract(viemChain.id, address as Address),
  });

  const token = tokens?.find((t) => t.token.tokenId === tokenId);

  return (
    <CollectionProvider chainId={viemChain.id} address={address as Address}>
      <main className="w-screen pt-12 md:pt-24 mt-10 px-2 md:px-10">
        {isLoading ? (
          <div className="size-full flex justify-center">
            <Loading className="w-[200px] aspect-[1/1] md:w-[300px] mt-20" />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            {token && (
              <TokenProvider
                key={token?.token?.tokenId}
                token={token}
                tokenId={token?.token?.tokenId}
              >
                <ZoraMintCommentProvider>
                  <Token />
                </ZoraMintCommentProvider>
              </TokenProvider>
            )}
          </div>
        )}
      </main>
    </CollectionProvider>
  );
};

export default TokenPage;
