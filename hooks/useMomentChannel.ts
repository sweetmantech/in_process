import { useEffect, useRef } from "react";
import { Moment } from "@/types/moment";
import { getAddress } from "viem";
import { addIndexerListener } from "@/lib/supabase/indexer/addIndexerListener";
import { removeIndexerListener } from "@/lib/supabase/indexer/removeIndexerListener";

type MomentUpdatedPayload = {
  collectionAddress: string;
  tokenId: number;
  chainId: number;
};

const useMomentChannel = (moment: Moment, fetchMomentData: () => void) => {
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

    addIndexerListener("moment:updated", handleMomentUpdate);
    addIndexerListener("moment:admin:updated", handleMomentUpdate);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      removeIndexerListener("moment:updated", handleMomentUpdate);
      removeIndexerListener("moment:admin:updated", handleMomentUpdate);
    };
  }, [collectionAddress, tokenId, chainId, fetchMomentData]);
};

export default useMomentChannel;
