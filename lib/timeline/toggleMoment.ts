import { Moment } from "@/types/moment";
import { Database } from "../supabase/types";
import { IN_PROCESS_API } from "@/lib/consts";

/**
 * Toggles the hidden state of a timeline moment by calling the hide API
 * @param moment - The timeline moment to toggle
 * @returns Promise with the API response containing updated row data
 */
export const toggleMoment = async (
  accessToken: string,
  moment: Moment
): Promise<{
  success: boolean;
  updated: Database["public"]["Tables"]["in_process_admins"]["Row"][];
}> => {
  const response = await fetch(`${IN_PROCESS_API}/moment/hide`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ moment }),
  });

  if (!response.ok) {
    throw new Error(`Failed to toggle moment: ${response.statusText}`);
  }

  return response.json();
};
