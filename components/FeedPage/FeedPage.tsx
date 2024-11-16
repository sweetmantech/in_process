"use client";

import LoginButton from "@/components/LoginButton";
import Token from "@/components/Token";
import { COLLECTION_ADDRESS } from "@/lib/consts";
import { usePrivy } from "@privy-io/react-auth";
import { createCollectorClient, MintableReturn } from "@zoralabs/protocol-sdk";
import { useEffect, useState } from "react";
import { baseSepolia } from "viem/chains";
import { Address } from "viem";
import { TokenProvider } from "@/providers/TokenProvider";
import { getPublicClient } from "@/lib/viem/publicClient";

export default function FeedPage({
  chainId = baseSepolia.id,
  address = COLLECTION_ADDRESS,
}: {
  chainId?: number;
  address?: Address;
}) {
  const [tokens, setTokens] = useState<MintableReturn[]>([]);
  const [loading, setLoading] = useState(true);
  const { authenticated } = usePrivy();

  useEffect(() => {
    async function fetchTokens() {
      try {
        const publicClient = getPublicClient(chainId);
        console.log("publicClient", publicClient);

        const collectorClient = createCollectorClient({
          chainId,
          publicClient,
        });
        console.log("COLLECTOR CLIENT", collectorClient);

        const { tokens: tokenData } = await collectorClient.getTokensOfContract(
          {
            tokenContract: address,
          }
        );

        console.log("TOKEN DATA", tokenData);
        const filteredTokens = tokenData.filter(
          (token) => token.token.tokenId !== undefined
        );
        console.log("filteredTokens", filteredTokens);

        setTokens([...filteredTokens].reverse());
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
  }, [address, chainId]);

  console.log("Tokens data:", tokens);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="mb-8">{!authenticated && <LoginButton />}</div>
        {loading ? (
          <p>Loading tokens...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {tokens.length > 0 &&
              tokens.map((token: any) => (
                <TokenProvider
                  key={token?.token?.tokenId || token.token.uid}
                  token={token}
                  tokenId={token?.token?.tokenId || token.token.uid}
                >
                  <Token />
                </TokenProvider>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
