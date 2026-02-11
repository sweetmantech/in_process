import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { getAddress } from "viem";
import { IN_PROCESS_CRON_SOCKET_URL } from "@/lib/consts";

type CollectionUpdatedPayload = {
  collectionAddress: string;
  chainId: number;
};

const DEBOUNCE_MS = 2000;

const useCollectionSocket = (collectionAddress: string, chainId: number) => {
  const queryClient = useQueryClient();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const socket = io(IN_PROCESS_CRON_SOCKET_URL, { forceNew: true });

    const handleCollectionUpdate = (payload: CollectionUpdatedPayload) => {
      try {
        const addressMatch =
          getAddress(payload.collectionAddress) === getAddress(collectionAddress);
        const chainMatch = payload.chainId === chainId;

        if (addressMatch && chainMatch) {
          if (debounceTimer.current) clearTimeout(debounceTimer.current);
          debounceTimer.current = setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: ["collection"],
            });
          }, DEBOUNCE_MS);
        }
      } catch (e) {
        console.error("collection update handler error", e);
      }
    };

    socket.on("collection:updated", handleCollectionUpdate);
    socket.on("collection:admin:updated", handleCollectionUpdate);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      socket.disconnect();
    };
  }, [collectionAddress, chainId, queryClient]);
};

export default useCollectionSocket;
