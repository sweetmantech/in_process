import useTokens from "@/hooks/useTokens";
import { Address } from "viem";
import { createContext, useContext, ReactNode } from "react";
import useCollection from "@/hooks/useCollection";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TokensContext = createContext<
  | (ReturnType<typeof useTokens> &
      ReturnType<typeof useCollection> & {
        chainId: number;
        collection: Address;
      })
  | undefined
>(undefined);

export function TokensProvider({
  children,
  collections,
}: {
  children: ReactNode;
  collections: any;
}) {
  const tokens = useTokens(collections);
  const collection = useCollection(
    collections[0].newContract,
    collections[0].chainId,
  );

  return (
    <TokensContext.Provider
      value={{
        ...tokens,
        chainId: collections[0].chainId,
        collection: collections[0].newContract,
        ...collection,
      }}
    >
      {children}
    </TokensContext.Provider>
  );
}

export function useTokensProvider() {
  const context = useContext(TokensContext);
  if (context === undefined) {
    throw new Error("useTokensProvider must be used within a TokensProvider");
  }
  return context;
}
