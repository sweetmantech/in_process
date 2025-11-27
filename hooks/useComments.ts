/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useMemo } from "react";
import { useInfiniteQuery, useQueryClient, InfiniteData } from "@tanstack/react-query";
import { MintComment } from "@/types/moment";
import fetchComments from "@/lib/moment/fetchComments";
import { useTokenProvider } from "@/providers/TokenProvider";

const COMMENTS_PER_PAGE = 20;

export function useComments() {
  const { token } = useTokenProvider();
  const queryClient = useQueryClient();
  const { tokenContractAddress: contractAddress, tokenId, chainId } = token;

  const query = useInfiniteQuery({
    queryKey: ["comments", contractAddress, tokenId, chainId],
    queryFn: ({ pageParam = 0 }) =>
      fetchComments({
        moment: {
          contractAddress: contractAddress!,
          tokenId: tokenId!,
        },
        chainId: chainId!,
        offset: pageParam as number,
      }),
    enabled: Boolean(contractAddress && tokenId && chainId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage, allPages) => {
      // If we got fewer than COMMENTS_PER_PAGE, there are no more comments
      // Note: Supabase range(offset, offset + 20) is inclusive, so it may return 21 items
      // We treat 20+ as a full page and continue pagination
      if (lastPage.length < COMMENTS_PER_PAGE) {
        return undefined;
      }
      // Otherwise, return the next offset (each page fetches COMMENTS_PER_PAGE items)
      return allPages.length * COMMENTS_PER_PAGE;
    },
    initialPageParam: 0,
  });

  const comments = useMemo(
    () => query.data?.pages.flatMap((page) => page) ?? [],
    [query.data?.pages]
  );

  const addComment = useCallback(
    (comment: MintComment) => {
      // Optimistically update the query cache
      queryClient.setQueryData<InfiniteData<MintComment[], number>>(
        ["comments", contractAddress, tokenId, chainId],
        (oldData) => {
          if (!oldData) {
            return {
              pages: [[comment]],
              pageParams: [0],
            };
          }
          // Add comment to the beginning of the first page
          return {
            pages: [[comment, ...oldData.pages[0]], ...oldData.pages.slice(1)],
            pageParams: oldData.pageParams,
          };
        }
      );
    },
    [queryClient, contractAddress, tokenId, chainId]
  );

  const fetchMore = useCallback(
    (offset: number) => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        query.fetchNextPage();
      }
    },
    [query]
  );

  return {
    comments,
    addComment,
    isLoading: query.isLoading || query.isFetching,
    hasMore: query.hasNextPage ?? false,
    fetchMore,
  };
}
