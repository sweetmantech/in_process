import { useState } from "react";
import { type Moment } from "@/types/timeline";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";

/**
 * Hook for toggling moment visibility state
 * Manages local hidden state and handles API call to toggle moment
 */
export const useToggleMoment = (moment: Moment) => {
  const [isHidden, setIsHidden] = useState(moment.admins[0].hidden);
  const { getAccessToken } = usePrivy();

  const toggle = async (): Promise<void> => {
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        toast("No access token found");
        return;
      }
      setIsHidden(true);
      // const response = await toggleMoment(accessToken, moment);

      // // Use the actual updated data from the server response
      // if (response.success && response.updated && response.updated.length > 0) {
      //   const updatedMoment = response.updated[0];
      //   // Update the local state with the server response
      //   setIsHidden(updatedMoment.admins[0].hidden);
      //   toast(updatedMoment.hidden ? "Moment hidden" : "Moment revealed");
      // } else {
      //   toast("Moment visibility toggled");
      // }
    } catch (error) {
      console.error("Failed to toggle moment visibility:", error);
      toast("Failed to toggle moment visibility");
    }
  };

  return { isHidden, toggle };
};
