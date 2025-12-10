import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPayments } from "@/lib/payments/fetchPayments";
import type { PaymentsResponse } from "@/types/payments";

interface UsePaymentsParams {
  page?: number;
  limit?: number;
  artist?: string;
  collector?: string;
}

export function usePayments(params: UsePaymentsParams = {}) {
  const { page = 1, limit = 20, artist, collector } = params;

  const [currentPage, setCurrentPage] = useState(page);

  const query = useInfiniteQuery({
    queryKey: ["payments", limit, artist, collector],
    queryFn: async ({ pageParam = 1 }) => {
      return fetchPayments(pageParam, limit, artist, collector);
    },
    enabled: Boolean(artist || collector),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage: PaymentsResponse) => {
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single array
  const payments = query.data?.pages.flatMap((page) => page.payments) ?? [];

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
