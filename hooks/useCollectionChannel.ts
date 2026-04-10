import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAddress } from "viem";
import { addIndexerListener, removeIndexerListener } from "@/lib/supabase/indexerChannel";

type CollectionUpdatedPayload = {
  collectionAddress: string;
  chainId: number;
};

const useCollectionChannel = (collectionAddress: string, chainId: number) => {
  const queryClient = useQueryClient();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleCollectionUpdate = (payload: { payload: CollectionUpdatedPayload }) => {
      try {
        const DEBOUNCE_MS = 2000;
        const data = payload.payload;
        const addressMatch = getAddress(data.collectionAddress) === getAddress(collectionAddress);
        const chainMatch = data.chainId === chainId;

        if (addressMatch && chainMatch) {
          if (debounceTimer.current) clearTimeout(debounceTimer.current);
          debounceTimer.current = setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ["collection"] });
          }, DEBOUNCE_MS);
        }
      } catch (e) {
        console.error("collection update handler error", e);
      }
    };

    addIndexerListener("collection:updated", handleCollectionUpdate);
    addIndexerListener("collection:admin:updated", handleCollectionUpdate);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      removeIndexerListener("collection:updated", handleCollectionUpdate);
      removeIndexerListener("collection:admin:updated", handleCollectionUpdate);
    };
  }, [collectionAddress, chainId, queryClient]);
};

export default useCollectionChannel;
