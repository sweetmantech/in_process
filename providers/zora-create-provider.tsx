"use client";

import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { createContext, useContext, useState } from "react";
import { zoraCreator721Factory } from "@zoralabs/zora-721-contracts";

interface ZoraCreateContextType {
  createToken: (params: CreateTokenParams) => Promise<string>;
  isLoading: boolean;
  error: Error | null;
}

interface CreateTokenParams {
  name: string;
  symbol: string;
  description?: string;
  sellerFeeBasisPoints?: number;
  mediaUrl?: string;
}

const ZoraCreateContext = createContext<ZoraCreateContextType>({
  createToken: async () => "",
  isLoading: false,
  error: null,
});

export function ZoraCreateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const createToken = async (params: CreateTokenParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const { hash } = await publicClient.writeContract({
        ...zoraCreator721Factory,
        functionName: "createToken",
        args: [
          params.name,
          params.symbol,
          params.description || "",
          params.sellerFeeBasisPoints || 0,
          params.mediaUrl || "",
        ],
      });
      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt.transactionHash;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ZoraCreateContext.Provider value={{ createToken, isLoading, error }}>
      {children}
    </ZoraCreateContext.Provider>
  );
}

export const useZoraCreate = () => useContext(ZoraCreateContext);
