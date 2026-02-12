import { useMemo, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMomentProvider } from "@/providers/MomentProvider";
import fetchCollectors from "@/lib/moment/fetchCollectors";

const COLLECTORS_PER_PAGE = 20;

export function useCollectors() {
  const { moment } = useMomentProvider();
  const { collectionAddress, tokenId, chainId } = moment;

  const query = useInfiniteQuery({
    queryKey: ["collectors", collectionAddress, tokenId, chainId],
    queryFn: ({ pageParam = 0 }) =>
      fetchCollectors({
        moment,
        offset: pageParam as number,
      }),
    enabled: Boolean(collectionAddress && tokenId && chainId),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < COLLECTORS_PER_PAGE) {
        return undefined;
      }
      return allPages.length * COLLECTORS_PER_PAGE;
    },
    initialPageParam: 0,
  });

  const collectors = useMemo(
    () => query.data?.pages.flatMap((page) => page) ?? [],
    [query.data?.pages]
  );

  const fetchMore = useCallback(() => {
    if (query.hasNextPage && !query.isFetchingNextPage) {
      query.fetchNextPage();
    }
  }, [query]);

  return {
    collectors,
    isLoading: query.isLoading || query.isFetching,
    hasMore: query.hasNextPage ?? false,
    fetchMore,
  };
}
