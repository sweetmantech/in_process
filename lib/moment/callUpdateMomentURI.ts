import { Moment } from "@/types/moment";

export interface CallUpdateMomentURIInput {
  moment: Moment;
  newUri: string;
  accessToken: string;
}

/**
 * Calls the API endpoint to update moment URI.
 * Handles authentication and error responses.
 */
export async function callUpdateMomentURI({
  moment,
  newUri,
  accessToken,
}: CallUpdateMomentURIInput): Promise<void> {
  try {
    const response = await fetch("/api/moment/update-uri", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        moment,
        newUri,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update moment metadata");
    }
    return data.hash;
  } catch (error: any) {
    throw new Error(error?.message || "Failed to update moment metadata");
  }
}
