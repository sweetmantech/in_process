import { useState, useEffect } from "react";
import { Moment, type TimelineMoment } from "@/types/moment";
import { toggleMoment } from "@/lib/timeline/toggleMoment";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { Address } from "viem";
import { useQueryClient } from "@tanstack/react-query";
import { useMomentAdminHidden } from "./useMomentAdminHidden";

/**
 * Hook for toggling moment visibility state
 * Manages local hidden state and handles API call to toggle moment
 */
export const useToggleMoment = (moment: TimelineMoment) => {
  const hidden = useMomentAdminHidden(moment);
  const [isHidden, setIsHidden] = useState(false);
  const { getAccessToken } = usePrivy();
  const queryClient = useQueryClient();

  // Sync local state when hidden value changes
  useEffect(() => {
    setIsHidden(hidden);
  }, [hidden]);

  const toggle = async (): Promise<void> => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        toast("No access token found");
        return;
      }
      const response = await toggleMoment(accessToken, {
        collectionAddress: moment.address as Address,
        tokenId: moment.token_id,
        chainId: moment.chain_id,
      });

      if (response.success) {
        const newHidden = !isHidden;
        setIsHidden(newHidden);
        toast(newHidden ? "Moment hidden" : "Moment revealed");
      }
      await queryClient.invalidateQueries({ queryKey: ["timeline"] });
    } catch (error) {
      console.error("Failed to toggle moment visibility:", error);
      toast("Failed to toggle moment visibility");
    }
  };

  return { isHidden, toggle };
};
