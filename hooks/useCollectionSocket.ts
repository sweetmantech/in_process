import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAddress } from "viem";
import getSocket from "@/lib/socket/getSocket";

type CollectionUpdatedPayload = {
  collectionAddress: string;
  chainId: number;
};

const useCollectionSocket = (collectionAddress: string, chainId: number) => {
  const queryClient = useQueryClient();
  const paramsRef = useRef({ collectionAddress, chainId });
  paramsRef.current = { collectionAddress, chainId };

  useEffect(() => {
    const socket = getSocket();

    const handleCollectionUpdate = (payload: CollectionUpdatedPayload) => {
      try {
        const { collectionAddress: addr, chainId: cId } = paramsRef.current;
        const addressMatch = getAddress(payload.collectionAddress) === getAddress(addr);
        const chainMatch = payload.chainId === cId;

        if (addressMatch && chainMatch) {
          queryClient.invalidateQueries({
            queryKey: ["collection"],
          });
        }
      } catch (e) {
        console.error("collection:updated handler error", e);
      }
    };

    socket.on("collection:updated", handleCollectionUpdate);
    socket.on("collection:admin:updated", handleCollectionUpdate);

    return () => {
      socket.off("collection:updated", handleCollectionUpdate);
      socket.off("collection:admin:updated", handleCollectionUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useCollectionSocket;
