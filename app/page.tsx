"use client";
import LoginButton from "@/components/LoginButton";
import Token from "@/components/Token";
import { COLLECTION_ADDRESS } from "@/lib/consts";
import {
  Avatar,
  Identity,
  Name,
  Badge,
  Address,
} from "@coinbase/onchainkit/identity";
import { usePrivy } from "@privy-io/react-auth";
import { createCollectorClient, MintableReturn } from "@zoralabs/protocol-sdk";
import { useEffect, useState } from "react";
import { useChainId, usePublicClient } from "wagmi";
import { PublicClient } from "viem";

export default function Home() {
  const [tokens, setTokens] = useState<MintableReturn[]>([]);
  const [loading, setLoading] = useState(true);
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { authenticated, logout } = usePrivy();

  useEffect(() => {
    async function fetchTokens() {
      if (!publicClient) return;

      try {
        const collectorClient = createCollectorClient({
          chainId,
          publicClient: publicClient as PublicClient,
        });

        const { tokens: tokenData } = await collectorClient.getTokensOfContract(
          {
            tokenContract: COLLECTION_ADDRESS,
          }
        );

        console.log(tokenData);
        setTokens([...tokenData].reverse());
      } catch (error) {
        console.error("Error fetching tokens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
  }, [chainId, publicClient]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="mb-8">
          {authenticated ? (
            <div onClick={() => logout()}>
              <Identity
                address="0x6e786fcfcb98da9df87ab0b7a2d64067c90daba9"
                schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
              >
                <Avatar className="w-16 h-16" />
                <Name className="text-lg font-bold mt-2">
                  <Badge />
                </Name>
                <Address className="text-sm text-gray-500" />
              </Identity>
            </div>
          ) : (
            <LoginButton />
          )}
        </div>

        {loading ? (
          <p>Loading tokens...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {tokens.map((token: any) => (
              <Token key={token.token.tokenId} token={token} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
