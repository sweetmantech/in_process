import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";
import { fetchPayments } from "@/lib/payments/fetchPayments";

export type Payment = InProcessPayment;

export function usePayments(
  page = 1,
  limit = 20,
  enabled = true,
  artist?: string,
  collector?: string
) {
  const [currentPage, setCurrentPage] = useState(page);

  const query = useQuery({
    queryKey: ["payments", currentPage, limit, artist, collector],
    queryFn: () => fetchPayments(currentPage, limit, artist, collector),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return {
    ...query,
    setCurrentPage,
    currentPage,
  };
}
