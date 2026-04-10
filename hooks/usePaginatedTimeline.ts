import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchTimeline } from "@/lib/timeline/fetchTimeline";
import { UseTimelineParams } from "@/types/timeline";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

export function usePaginatedTimeline({
  limit = 10,
  enabled = true,
  artistAddress,
  collection,
  includeHidden = false,
  type,
  period,
  channel,
  contentType,
  curated = true,
}: UseTimelineParams = {}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { chainId, address: normalizedCollection } = parseCollectionAddress(collection);

  const query = useQuery({
    queryKey: [
      "timeline-paginated",
      limit,
      artistAddress,
      normalizedCollection,
      includeHidden,
      type,
      chainId,
      currentPage,
      period,
      channel,
      contentType,
      curated,
    ],
    queryFn: () =>
      fetchTimeline({
        page: currentPage,
        limit,
        artistAddress,
        collection: normalizedCollection,
        includeHidden,
        type,
        chainId,
        period,
        channel,
        contentType,
        curated,
      }),
    enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const pagination = query.data?.pagination ?? { page: currentPage, limit, total_pages: 1 };

  return {
    ...query,
    data: query.data
      ? {
          status: query.data.status,
          moments: query.data.moments,
          pagination,
        }
      : undefined,
    moments: query.data?.moments ?? [],
    currentPage,
    setCurrentPage,
    totalPages: pagination.total_pages,
    hasNextPage: currentPage < pagination.total_pages,
    hasPrevPage: currentPage > 1,
    fetchMore: () => {},
    isFetchingNextPage: false,
  };
}
