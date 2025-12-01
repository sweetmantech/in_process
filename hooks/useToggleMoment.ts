import { useState } from "react";
import { type TimelineMoment } from "@/types/moment";
import { toggleMoment } from "@/lib/timeline/toggleMoment";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";

/**
 * Hook for toggling moment visibility state
 * Manages local hidden state and handles API call to toggle moment
 */
export const useToggleMoment = (moment: TimelineMoment) => {
  const [isHidden, setIsHidden] = useState(moment.default_admin.hidden);
  const { getAccessToken } = usePrivy();

  const toggle = async (): Promise<void> => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        toast("No access token found");
        return;
      }
      const response = await toggleMoment(accessToken, moment);

      // Use the actual updated data from the server response
      if (response.success && response.updated && response.updated.length > 0) {
        const updatedMoment = response.updated[0];
        // Update the local state with the server response
        setIsHidden(updatedMoment.hidden);
        toast(updatedMoment.hidden ? "Moment hidden" : "Moment revealed");
      } else {
        toast("Moment visibility toggled");
      }
    } catch (error) {
      console.error("Failed to toggle moment visibility:", error);
      toast("Failed to toggle moment visibility");
    }
  };

  return { isHidden, toggle };
};
