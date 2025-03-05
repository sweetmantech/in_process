"use client";

import LoginButton from "@/components/LoginButton";
import Token from "@/components/Token";
import { CHAIN_ID, COLLECTION_ADDRESS } from "@/lib/consts";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import { TokenProvider } from "@/providers/TokenProvider";
import { getTokensOfContract } from "@/lib/viem/getTokensOfContract";
import { useQuery } from "@tanstack/react-query";

export default function FeedPage({
  chainId = CHAIN_ID,
  address = COLLECTION_ADDRESS,
}: {
  chainId?: number;
  address?: Address;
}) {
  const { authenticated } = usePrivy();
  const { data: tokens = [], isLoading } = useQuery({
    queryKey: ["tokens", chainId, address],
    queryFn: () => getTokensOfContract(chainId, address),
  });

  return (
    <main className="w-screen pt-20">
      <div className="mb-8">{!authenticated && <LoginButton />}</div>
      {isLoading ? (
        <p>Loading tokens...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {tokens.length > 0 &&
            tokens.map((token) => (
              <TokenProvider
                key={token?.token?.tokenId}
                token={token}
                tokenId={token?.token?.tokenId}
              >
                <Token />
              </TokenProvider>
            ))}
        </div>
      )}
    </main>
  );
}
