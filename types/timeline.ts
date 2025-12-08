import { TimelineMoment } from "@/types/moment";

export interface TimelineResponse {
  status: "success" | "error";
  moments: TimelineMoment[];
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

export interface UseTimelineParams {
  page?: number;
  limit?: number;
  enabled?: boolean;
  artistAddress?: string;
  collection?: string;
  includeHidden?: boolean;
  type?: "mutual" | "default";
}

export interface FetchTimelineParams {
  page?: number;
  limit?: number;
  artistAddress?: string;
  collection?: string;
  includeHidden?: boolean;
  type?: "mutual" | "default";
  chainId?: number;
}
