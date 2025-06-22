import { TimelineMoment } from "@/hooks/useTimelineApi";
import { InProcessToken } from "../supabase/in_process_tokens/updateInProcessTokens";

/**
 * Toggles the hidden state of a timeline moment by calling the hide API
 * @param moment - The timeline moment to toggle
 * @returns Promise with the API response containing updated row data
 */
export const toggleMoment = async (
  moment: TimelineMoment
): Promise<{
  success: boolean;
  updated: InProcessToken[];
}> => {
  const response = await fetch("/api/token/hide", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ moment }),
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle moment: ${response.statusText}`);
  }

  return response.json();
};
