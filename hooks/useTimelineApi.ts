import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchTimeline } from "@/lib/timeline/fetchTimeline";

export function useTimelineApi(
  page = 1,
  limit = 100,
  enabled = true,
  artistAddress?: string,
  includeHidden = false,
  type = "timeline"
) {
  const [currentPage, setCurrentPage] = useState(page);

  const query = useInfiniteQuery({
    queryKey: ["timeline", limit, artistAddress, includeHidden, type],
    queryFn: ({ pageParam = 1 }) =>
      fetchTimeline(pageParam, limit, artistAddress, includeHidden, type),
    enabled,
    staleTime: 1000 * 60 * 5,
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
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) ?? [];

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
          pagination: pagination || { total_count: 0, page: 1, limit, total_pages: 1 },
        }
      : undefined,
    setCurrentPage,
    currentPage,
    fetchMore,
  };
}
