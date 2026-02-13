import { Moment } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

export const toggleMoment = async (
  accessToken: string,
  moment: Moment
): Promise<{ success: boolean }> => {
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
