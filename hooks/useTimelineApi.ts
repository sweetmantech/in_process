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
  hidden?: boolean;
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

async function fetchTimeline(
  page = 1,
  limit = 20,
  artistAddress?: string,
  includeHidden = false
): Promise<TimelineResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (artistAddress) params.append("artist", artistAddress);
  if (includeHidden) params.append("hidden", "true");
  const res = await fetch(`/api/timeline?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch timeline");
  return res.json();
}

export function useTimelineApi(
  page = 1,
  limit = 100,
  enabled = true,
  artistAddress?: string,
  includeHidden = false
) {
  const [currentPage, setCurrentPage] = useState(page);
  const query = useQuery({
    queryKey: ["timeline", currentPage, limit, artistAddress, includeHidden],
    queryFn: () => fetchTimeline(currentPage, limit, artistAddress, includeHidden),
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
