"use client";

import { createPublicClient, http } from "viem";
import { base } from "viem/chains";
import { createContext, useContext, useState } from "react";
import {
  zoraCreator1155FactoryImplABI,
  zoraCreator1155FactoryImplAddress,
} from "@zoralabs/protocol-deployments";

interface ZoraCreateContextType {
  createToken: (params: CreateTokenParams) => Promise<string>;
  isLoading: boolean;
  error: Error | null;
  imageUri?: string;
  animationUri?: string;
  mimeType?: string;
}

interface CreateTokenParams {
  name: string;
  symbol: string;
  description?: string;
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
  const [imageUri, setImageUri] = useState<string>();
  const [animationUri, setAnimationUri] = useState<string>();
  const [mimeType, setMimeType] = useState<string>();

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const createToken = async (params: CreateTokenParams) => {
    setIsLoading(true);
    setError(null);
    try {
      const { hash } = await publicClient.writeContract({
        address: zoraCreator1155FactoryImplAddress,
        abi: zoraCreator1155FactoryImplABI,
        functionName: "createContract",
        args: [
          params.name,
          params.symbol,
          params.description || "",
          0,
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
    <ZoraCreateContext.Provider
      value={{
        createToken,
        isLoading,
        error,
        imageUri,
        animationUri,
        mimeType,
      }}
    >
      {children}
    </ZoraCreateContext.Provider>
  );
}

export const useZoraCreate = () => useContext(ZoraCreateContext);
