"use client";

import LoginButton from "@/components/LoginButton";
import Token from "@/components/Token";
import { CHAIN_ID, COLLECTION_ADDRESS } from "@/lib/consts";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import { TokenProvider } from "@/providers/TokenProvider";
import { getTokensOfContract } from "@/lib/viem/getTokensOfContract";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";

const TokenPage = ({
  chainId = CHAIN_ID,
  address = COLLECTION_ADDRESS,
  tokenId,
}: {
  chainId?: number;
  address?: Address;
  tokenId: Address;
}) => {
  const { authenticated } = usePrivy();
  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ["tokens", chainId, address],
    queryFn: () => getTokensOfContract(chainId, address),
  });

  const token = tokens?.find((t) => t.token.tokenId === tokenId);

  return (
    <main className="w-screen pt-24 mt-10 px-10">
      <div className="mb-8">{!authenticated && <LoginButton />}</div>
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-14 w-1/3" />
          <Skeleton className="h-14 w-1/2" />
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10">
          {token && (
            <TokenProvider
              key={token?.token?.tokenId}
              token={token}
              tokenId={token?.token?.tokenId}
            >
              <Token />
            </TokenProvider>
          )}
        </div>
      )}
    </main>
  );
};

export default TokenPage;
