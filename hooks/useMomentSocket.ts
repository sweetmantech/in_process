import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Moment } from "@/types/moment";
import { getAddress } from "viem";
import { IN_PROCESS_CRON_SOCKET_URL } from "@/lib/consts";

type MomentUpdatedPayload = {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
};

const useMomentSocket = (moment: Moment, fetchMomentData: () => void) => {
  const { collectionAddress, tokenId, chainId } = moment;
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const socket = io(IN_PROCESS_CRON_SOCKET_URL, { forceNew: true });

    const handleMomentUpdate = (payload: MomentUpdatedPayload) => {
      try {
        const addressMatch =
          getAddress(payload.collectionAddress) === getAddress(collectionAddress);
        const tokenMatch = String(payload.tokenId) === String(tokenId);
        const chainMatch = payload.chainId === chainId;

        if (addressMatch && tokenMatch && chainMatch) {
          if (debounceTimer.current) clearTimeout(debounceTimer.current);
          debounceTimer.current = setTimeout(() => {
            fetchMomentData();
          }, 2000);
        }
      } catch (e) {
        console.error("moment update handler error", e);
      }
    };

    socket.on("moment:updated", handleMomentUpdate);
    socket.on("moment:admin:updated", handleMomentUpdate);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      socket.disconnect();
    };
  }, [collectionAddress, tokenId, chainId, fetchMomentData]);
};

export default useMomentSocket;
