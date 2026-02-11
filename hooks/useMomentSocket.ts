import { useEffect } from "react";
import { Moment } from "@/types/moment";
import { getAddress } from "viem";
import getSocket from "@/lib/socket/getSocket";
type MomentUpdatedPayload = {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
};

const useMomentSocket = (moment: Moment, fetchMomentData: () => void) => {
  const { collectionAddress, tokenId, chainId } = moment;

  useEffect(() => {
    const socket = getSocket();

    const handleMomentUpdate = (payload: MomentUpdatedPayload) => {
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
    };

    socket.on("moment:updated", handleMomentUpdate);

    return () => {
      socket.off("moment:updated", handleMomentUpdate);
    };
  }, [collectionAddress, tokenId, chainId, fetchMomentData]);
};

export default useMomentSocket;
