import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { getAddress } from "viem";
import { IN_PROCESS_CRON_SOCKET_URL } from "@/lib/consts";

type CollectionUpdatedPayload = {
  collectionAddress: string;
  chainId: number;
};

const useCollectionSocket = (collectionAddress: string, chainId: number) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(IN_PROCESS_CRON_SOCKET_URL, { forceNew: true });

    const handleCollectionUpdate = (payload: CollectionUpdatedPayload) => {
      try {
        const addressMatch =
          getAddress(payload.collectionAddress) === getAddress(collectionAddress);
        const chainMatch = payload.chainId === chainId;

        if (addressMatch && chainMatch) {
          queryClient.invalidateQueries({
            queryKey: ["collection"],
          });
        }
      } catch (e) {
        console.error("collection update handler error", e);
      }
    };

    socket.on("collection:updated", handleCollectionUpdate);
    socket.on("collection:admin:updated", handleCollectionUpdate);

    return () => {
      socket.off("collection:updated", handleCollectionUpdate);
      socket.off("collection:admin:updated", handleCollectionUpdate);
      socket.disconnect();
    };
  }, [collectionAddress, chainId, queryClient]);
};

export default useCollectionSocket;
