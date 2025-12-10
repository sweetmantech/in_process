import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPayments } from "@/lib/payments/fetchPayments";
import type { PaymentsResponse } from "@/types/payments";

interface UsePaymentsParams {
  page?: number;
  limit?: number;
  artist?: string;
  collector?: string;
}

export function usePayments(params: UsePaymentsParams = {}) {
  const { limit = 20, artist, collector } = params;

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

  return query;
}
