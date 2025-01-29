"use client";

import LoginButton from "@/components/LoginButton";
import Token from "@/components/Token";
import { CHAIN_ID, COLLECTION_ADDRESS } from "@/lib/consts";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Address } from "viem";
import { TokenProvider } from "@/providers/TokenProvider";
import { getPublicClient } from "@/lib/viem/publicClient";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

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
    async function fetchTokens() {
      try {
        const publicClient = getPublicClient(chainId);

        // Get the next token ID to know how many tokens to fetch
        const nextTokenId = await publicClient.readContract({
          address,
          abi: zoraCreator1155ImplABI,
          functionName: "nextTokenId",
        });

        console.log("nextTokenId", nextTokenId);

        const tokenPromises = [];
        // Fetch all tokens from 1 to nextTokenId - 1
        for (let i = BigInt(1); i < nextTokenId; i++) {
          const promise = publicClient
            .readContract({
              address,
              abi: zoraCreator1155ImplABI,
              functionName: "uri",
              args: [i],
            })
            .then(async (uri) => {
              return {
                token: {
                  tokenId: i,
                  uri,
                  contract: {
                    address,
                  },
                },
              };
            });
          tokenPromises.push(promise);
        }

        const tokenResults = await Promise.all(tokenPromises);
        console.log("tokenResults", tokenResults);
        setTokens(tokenResults.reverse());
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
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
