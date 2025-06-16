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
  hidden: boolean;
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
  artistAddress?: Address,
  address?: Address,
  chainId?: string
): Promise<TimelineResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (artistAddress) params.append("artist", artistAddress);
  if (address) params.append("address", address);
  if (chainId !== undefined) params.append("chainId", String(chainId));
  const res = await fetch(`/api/timeline?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch timeline");
  return res.json();
}

export interface UseTimelineApiOptions {
  page?: number;
  limit?: number;
  enabled?: boolean;
  artistAddress?: Address;
  address?: Address;
  chainId?: string;
}

export function useTimelineApi({
  page = 1,
  limit = 100,
  enabled = true,
  artistAddress,
  address,
  chainId,
}: UseTimelineApiOptions = {}) {
  console.log("USE TIMELINE API", artistAddress, address, chainId);
  const [currentPage, setCurrentPage] = useState(page);
  const query = useQuery({
    queryKey: ["timeline", currentPage, limit, artistAddress, address, chainId],
    queryFn: () =>
      fetchTimeline(currentPage, limit, artistAddress, address, chainId),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });
  console.log("USE TIMELINE API", query.data);

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
