import { InprocessTimelineResponse, Moment } from "@/types/timeline";

/**
 * Fetches in-process timeline data from the API endpoint.
 * Returns the moments array from the successful response.
 */
export const getInProcessTimelineApi = async (): Promise<Moment[]> => {
  const res = await fetch("/api/timeline/inprocess");
  if (!res.ok) {
    throw new Error(`Failed to fetch timeline: ${res.statusText}`);
  }

  const data: InprocessTimelineResponse = await res.json();

  return data.moments;
};
