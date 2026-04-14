import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getTransferPayments } from "@/lib/payments/getTransferPayments";
import type { PaymentTransferRow, PaymentsTab, TransferPaymentsResponse } from "@/types/payments";
import { useUserProvider } from "@/providers/UserProvider";

/** Matches API default and other list endpoints (e.g. notifications, timeline). */
const PAYMENTS_QUERY_PAGE_LIMIT = 20;

const usePayments = () => {
  const { artistWallet } = useUserProvider();
  const [paymentsTab, setPaymentsTab] = useState<PaymentsTab>("income");

  const paymentsQuery = useInfiniteQuery({
    queryKey: ["payments-transfers", PAYMENTS_QUERY_PAGE_LIMIT, paymentsTab, artistWallet],
    queryFn: async ({ pageParam = 1 }) => {
      return getTransferPayments(pageParam, PAYMENTS_QUERY_PAGE_LIMIT, paymentsTab, artistWallet!);
    },
    enabled: Boolean(artistWallet),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    getNextPageParam: (lastPage: TransferPaymentsResponse) => {
      const { page, total_pages } = lastPage.pagination;
      return page < total_pages ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const payments = useMemo(
    (): PaymentTransferRow[] => paymentsQuery.data?.pages.flatMap((page) => page.transfers) ?? [],
    [paymentsQuery.data]
  );

  const isExpense = paymentsTab === "income";

  return useMemo(
    () => ({
      paymentsTab,
      setPaymentsTab,
      artistWallet,
      payments,
      fetchMore: paymentsQuery.fetchNextPage,
      hasNextPage: Boolean(paymentsQuery.hasNextPage),
      isExpense,
      data: paymentsQuery.data,
      isPending: paymentsQuery.isPending,
      error: paymentsQuery.error instanceof Error ? paymentsQuery.error : null,
    }),
    [
      artistWallet,
      isExpense,
      payments,
      paymentsTab,
      paymentsQuery.data,
      paymentsQuery.isPending,
      paymentsQuery.error,
      paymentsQuery.fetchNextPage,
      paymentsQuery.hasNextPage,
    ]
  );
};

export default usePayments;
