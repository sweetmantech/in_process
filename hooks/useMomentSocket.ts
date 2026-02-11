import { useEffect } from "react";
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

  useEffect(() => {
    const socket = io(IN_PROCESS_CRON_SOCKET_URL);

    socket.on("moment:updated", (payload: MomentUpdatedPayload) => {
      try {
        const addressMatch =
          getAddress(payload.collectionAddress) === getAddress(collectionAddress);
        const tokenMatch = String(payload.tokenId) === String(tokenId);
        const chainMatch = payload.chainId === chainId;

        if (addressMatch && tokenMatch && chainMatch) {
          fetchMomentData();
        }
      } catch (e) {
        console.error("moment:updated handler error", e);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [collectionAddress, tokenId, chainId, fetchMomentData]);
};

export default useMomentSocket;
