import useCollectionMoments from "@/hooks/useCollectionMoments";
import { Address } from "viem";
import { createContext, useContext, ReactNode } from "react";
import useCollection from "@/hooks/useCollection";

interface CollectionContextReturn {
  tokens: ReturnType<typeof useCollectionMoments>;
  collection: {
    address: Address;
    chainId: number;
    metadata: ReturnType<typeof useCollection>;
  };
}

const CollectionContext = createContext<CollectionContextReturn | undefined>(undefined);

export function CollectionProvider({
  children,
  collection,
}: {
  children: ReactNode;
  collection: {
    address: Address;
    chainId: number;
  };
}) {
  const tokens = useCollectionMoments(collection);
  const metadata = useCollection(collection.address, collection.chainId);
  return (
    <CollectionContext.Provider
      value={{
        tokens,
        collection: {
          ...collection,
          metadata,
        },
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollectionProvider() {
  const context = useContext(CollectionContext);
  if (context === undefined) {
    throw new Error("useCollectionProvider must be used within a CollectionProvider");
  }
  return context;
}
