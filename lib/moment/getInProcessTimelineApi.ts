import { InProcessMoment } from "@/types/moment";

interface InProcessTimelineResponse {
  status: "success" | "error";
  moments: InProcessMoment[];
  message?: string;
}

/**
 * Fetches in-process timeline data from the API endpoint.
 * Returns the moments array from the successful response.
 */
export const getInProcessTimelineApi = async (): Promise<InProcessMoment[]> => {
  const res = await fetch("/api/timeline/inprocess");
  if (!res.ok) {
    throw new Error(`Failed to fetch timeline: ${res.statusText}`);
  }

  const data: InProcessTimelineResponse = await res.json();

  if (data.status === "error") {
    throw new Error(data.message || "Failed to fetch timeline");
  }

  return data.moments || [];
};
