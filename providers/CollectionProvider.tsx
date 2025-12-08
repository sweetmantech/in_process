import useCollectionMoments from "@/hooks/useCollectionMoments";
import { Address } from "viem";
import { createContext, useContext, ReactNode } from "react";
import useCollection from "@/hooks/useCollection";

const CollectionContext = createContext<
  ReturnType<typeof useCollection> & {
    tokens: ReturnType<typeof useCollectionMoments>;
  }
>(
  {} as ReturnType<typeof useCollection> & {
    tokens: ReturnType<typeof useCollectionMoments>;
  }
);

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
  const collectiondata = useCollection({
    collectionAddress: collection.address,
    chainId: collection.chainId.toString(),
  });

  return (
    <CollectionContext.Provider
      value={{
        tokens,
        ...collectiondata,
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
