import { useEffect, useRef } from "react";
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
  const paramsRef = useRef({ collectionAddress, tokenId, chainId, fetchMomentData });
  paramsRef.current = { collectionAddress, tokenId, chainId, fetchMomentData };

  useEffect(() => {
    const socket = getSocket();

    const handleMomentUpdate = (payload: MomentUpdatedPayload) => {
      try {
        const {
          collectionAddress: addr,
          tokenId: tId,
          chainId: cId,
          fetchMomentData: fetch,
        } = paramsRef.current;
        const addressMatch = getAddress(payload.collectionAddress) === getAddress(addr);
        const tokenMatch = String(payload.tokenId) === String(tId);
        const chainMatch = payload.chainId === cId;

        if (addressMatch && tokenMatch && chainMatch) {
          fetch();
        }
      } catch (e) {
        console.error("moment:updated handler error", e);
      }
    };

    socket.on("moment:updated", handleMomentUpdate);

    return () => {
      socket.off("moment:updated", handleMomentUpdate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMomentSocket;
