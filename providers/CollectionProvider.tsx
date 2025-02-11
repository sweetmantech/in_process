import { createContext, useContext, ReactNode } from "react";
import { CollectionStyle } from "@/types/zora";
import useCollectionStyling from "@/hooks/useCollectionStyling";
import { Address } from "viem";

interface CollectionContextType {
  styling?: CollectionStyle;
  address: Address;
  chainId: number;
}

interface CollectionProviderProps {
  children: ReactNode;
  chainId: number;
  address: Address;
}

const CollectionContext = createContext<CollectionContextType>(
  {} as CollectionContextType,
);

export function CollectionProvider({
  children,
  chainId,
  address,
}: CollectionProviderProps) {
  const { styling } = useCollectionStyling(chainId, address);

  return (
    <CollectionContext.Provider value={{ styling, address, chainId }}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionProvider() {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error(
      "useCollectionProvider must be used within a CollectionProvider",
    );
  }
  return context;
}
