import { TimelineMoment } from "@/hooks/useTimelineApi";

/**
 * Toggles the hidden state of a timeline moment by calling the hide API
 * @param moment - The timeline moment to toggle
 * @returns Promise that resolves when the API call completes
 */
export const toggleMoment = async (moment: TimelineMoment): Promise<void> => {
  await fetch("/api/token/hide", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ moment }),
  });
};