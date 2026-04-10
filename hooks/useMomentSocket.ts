import { useEffect, useRef } from "react";
import { Moment } from "@/types/moment";
import { getAddress } from "viem";
import { indexerChannel } from "@/lib/supabase/client";

type MomentUpdatedPayload = {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
};

const useMomentSocket = (moment: Moment, fetchMomentData: () => void) => {
  const { collectionAddress, tokenId, chainId } = moment;
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleMomentUpdate = (payload: { payload: MomentUpdatedPayload }) => {
      try {
        const data = payload.payload;
        const addressMatch = getAddress(data.collectionAddress) === getAddress(collectionAddress);
        const tokenMatch = String(data.tokenId) === String(tokenId);
        const chainMatch = data.chainId === chainId;

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

    indexerChannel
      .on("broadcast", { event: "moment:updated" }, handleMomentUpdate)
      .on("broadcast", { event: "moment:admin:updated" }, handleMomentUpdate)
      .subscribe();

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      indexerChannel.unsubscribe();
    };
  }, [collectionAddress, tokenId, chainId, fetchMomentData]);
};

export default useMomentSocket;
