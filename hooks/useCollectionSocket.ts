import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAddress } from "viem";
import { indexerChannel } from "@/lib/supabase/client";

type CollectionUpdatedPayload = {
  collectionAddress: string;
  chainId: number;
};

const useCollectionSocket = (collectionAddress: string, chainId: number) => {
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

    indexerChannel
      .on("broadcast", { event: "collection:updated" }, handleCollectionUpdate)
      .on("broadcast", { event: "collection:admin:updated" }, handleCollectionUpdate)
      .subscribe();

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      indexerChannel.unsubscribe();
    };
  }, [collectionAddress, chainId, queryClient]);
};

export default useCollectionSocket;
