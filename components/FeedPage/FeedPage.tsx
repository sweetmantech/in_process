"use client";

import LoginButton from "@/components/LoginButton";
import Token from "@/components/Token";
import { CHAIN_ID, COLLECTION_ADDRESS } from "@/lib/consts";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { TokenProvider } from "@/providers/TokenProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { getTokensOfContract } from "@/lib/viem/getTokensOfContract";

export default function FeedPage({
  chainId = CHAIN_ID,
  address = COLLECTION_ADDRESS,
}: {
  chainId?: number;
  address?: Address;
}) {
  const [tokens, setTokens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { authenticated } = usePrivy();
  const { styling } = useCollectionProvider();

  useEffect(() => {
    async function fetchData() {
      try {
        const tokens = await getTokensOfContract(chainId, address);
        setTokens(tokens);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [address, chainId]);

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{
        backgroundColor: styling?.theme?.color?.background,
        color: styling?.theme?.color?.text,
      }}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="mb-8">{!authenticated && <LoginButton />}</div>
        {loading ? (
          <p>Loading tokens...</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 max-w-2xl w-full">
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
    </div>
  );
}
