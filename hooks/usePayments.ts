import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";
import { fetchPayments } from "@/lib/payments/fetchPayments";

export type Payment = InProcessPayment;

export type PaymentWithType = InProcessPayment & {
  type: "earning" | "expense";
};

export interface PaymentsResponse {
  status: "success" | "error";
  payments: Payment[];
  pagination: {
    total_count: number;
    page: number;
    limit: number;
    total_pages: number;
  };
  message?: string;
}

export interface PaymentsCombinedResponse {
  status: "success" | "error";
  payments: PaymentWithType[];
  message?: string;
}

export function usePayments(
  page = 1,
  limit = 20,
  enabled = true,
  artist?: string,
  combined = false
) {
  const [currentPage, setCurrentPage] = useState(page);

  const query = useQuery({
    queryKey: ["payments", currentPage, limit, artist, combined],
    queryFn: async () => {
      if (combined && artist) {
        // Combined mode: fetch both earnings and expenses
        const [earningsResponse, expensesResponse] = await Promise.all([
          fetchPayments(currentPage, Math.ceil(limit / 2), artist), // artist payments
          fetchPayments(currentPage, Math.ceil(limit / 2), undefined, artist), // collector payments
        ]);

        // Combine and type the payments
        const earnings: PaymentWithType[] = (
          earningsResponse.payments || []
        ).map((payment) => ({
          ...payment,
          type: "earning" as const,
        }));

        const expenses: PaymentWithType[] = (
          expensesResponse.payments || []
        ).map((payment) => ({
          ...payment,
          type: "expense" as const,
        }));

        // Combine and sort by block number (most recent first)
        const combinedPayments = [...earnings, ...expenses].sort(
          (a, b) => parseInt(b.block) - parseInt(a.block)
        );

        return {
          status: "success" as const,
          payments: combinedPayments.slice(0, limit), // Ensure we don't exceed the limit
        } as PaymentsCombinedResponse;
      } else {
        // Regular mode: fetch single type of payments
        return fetchPayments(currentPage, limit, artist);
      }
    },
    enabled: combined ? enabled && Boolean(artist) : enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
