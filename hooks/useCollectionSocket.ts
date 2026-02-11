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
    const socket = io(IN_PROCESS_CRON_SOCKET_URL);

    socket.on("collection:updated", (payload: CollectionUpdatedPayload) => {
      try {
        const addressMatch =
          getAddress(payload.collectionAddress) === getAddress(collectionAddress);
        const chainMatch = payload.chainId === chainId;

        if (addressMatch && chainMatch) {
          queryClient.resetQueries({
            queryKey: ["collection"],
          });
        }
      } catch (e) {
        console.error("collection:updated handler error", e);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [collectionAddress, chainId, queryClient]);
};

export default useCollectionSocket;
