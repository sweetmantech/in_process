import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Address } from "viem";

export interface TimelineMoment {
  address: Address;
  tokenId: string;
  chainId: number;
  id: string;
  uri: string;
  admin: Address;
  createdAt: string;
  username: string;
}

export interface TimelineResponse {
  status: "success" | "error";
  moments: TimelineMoment[];
  pagination: {
    total_count: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

async function fetchTimeline(page = 1, limit = 20): Promise<TimelineResponse> {
  const res = await fetch(`/api/timeline?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch timeline");
  return res.json();
}

export function useTimelineApi(page = 1, limit = 20, enabled = true) {
  const [currentPage, setCurrentPage] = useState(page);
  const query = useQuery({
    queryKey: ["timeline", currentPage, limit],
    queryFn: () => fetchTimeline(currentPage, limit),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
