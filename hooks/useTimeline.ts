import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchTimeline } from "@/lib/timeline/fetchTimeline";
import { UseTimelineParams } from "@/types/timeline";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

export function useTimeline({
  page = 1,
  limit = 100,
  enabled = true,
  artistAddress,
  collection,
  includeHidden = false,
  type,
}: UseTimelineParams = {}) {
  const [currentPage, setCurrentPage] = useState(page);

  const { chainId, address: normalizedCollection } = parseCollectionAddress(collection);

  const query = useInfiniteQuery({
    queryKey: [
      "timeline",
      limit,
      artistAddress,
      normalizedCollection,
      includeHidden,
      type,
      chainId,
    ],
    queryFn: ({ pageParam = 1 }) => {
      return fetchTimeline({
        page: pageParam,
        limit,
        artistAddress,
        collection: normalizedCollection,
        includeHidden,
        type,
        chainId,
      });
    },
    enabled,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const moments =
    query.data?.pages
      .flatMap((page) => page.moments)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) ?? [];

  const pagination = query.data?.pages[query.data.pages.length - 1]?.pagination;

  const fetchMore = () => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  };

  return {
    ...query,
    data: query.data
      ? {
          status: query.data.pages[0]?.status || "success",
          moments,
          pagination: pagination || { page: 1, limit, total_pages: 1 },
        }
      : undefined,
    setCurrentPage,
    currentPage,
    fetchMore,
  };
}
