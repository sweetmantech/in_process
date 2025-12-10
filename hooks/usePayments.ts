import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { fetchPayments } from "@/lib/payments/fetchPayments";
import { fetchCombinedPayments } from "@/lib/payments/fetchCombinedPayments";
import { getNextCombinedPage } from "@/lib/payments/getNextCombinedPage";
import type { PaymentsResponse, PaymentsCombinedResponse } from "@/types/payments";

interface CombinedPaginationState {
  earningsPage: number;
  expensesPage: number;
  earningsTotalPages: number;
  expensesTotalPages: number;
  earningsFinished: boolean;
  expensesFinished: boolean;
}

export function usePayments(
  page = 1,
  limit = 20,
  enabled = true,
  artist?: string,
  combined = false
) {
  const [currentPage, setCurrentPage] = useState(page);

  // Track pagination state for combined mode
  const paginationStateRef = useRef<CombinedPaginationState>({
    earningsPage: 1,
    expensesPage: 1,
    earningsTotalPages: 1,
    expensesTotalPages: 1,
    earningsFinished: false,
    expensesFinished: false,
  });

  // Reset pagination state when query key changes
  useEffect(() => {
    paginationStateRef.current = {
      earningsPage: 1,
      expensesPage: 1,
      earningsTotalPages: 1,
      expensesTotalPages: 1,
      earningsFinished: false,
      expensesFinished: false,
    };
  }, [limit, artist, combined]);

  const query = useInfiniteQuery({
    queryKey: ["payments", limit, artist, combined],
    queryFn: async ({ pageParam = 1 }) => {
      if (combined && artist) {
        // Fetch combined payments using current pagination state
        const response = await fetchCombinedPayments(
          pageParam,
          limit,
          artist,
          paginationStateRef.current
        );

        // Increment page numbers for next fetch
        if (!paginationStateRef.current.earningsFinished) {
          paginationStateRef.current.earningsPage += 1;
        }
        if (!paginationStateRef.current.expensesFinished) {
          paginationStateRef.current.expensesPage += 1;
        }

        return response;
      } else {
        // Regular mode: fetch single type of payments
        return fetchPayments(pageParam, limit, artist);
      }
    },
    enabled: combined ? enabled && Boolean(artist) : enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage, allPages) => {
      // Combined mode: check if either request has more pages
      if ("earningsPagination" in lastPage && "expensesPagination" in lastPage) {
        return getNextCombinedPage(lastPage as PaymentsCombinedResponse);
      }

      // Regular mode: standard pagination check
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single array
  const payments =
    query.data?.pages
      .flatMap((page) => page.payments)
      .sort((a, b) => {
        // For combined mode, maintain sort order by transferred_at
        if (combined) {
          return new Date(b.transferred_at).getTime() - new Date(a.transferred_at).getTime();
        }
        // For regular mode, payments are already sorted by the API
        return 0;
      }) ?? [];

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
          payments,
          pagination: pagination || { page: 1, limit, total_pages: 1, total_count: 0 },
        }
      : undefined,
    setCurrentPage,
    currentPage,
    fetchMore,
  };
}
