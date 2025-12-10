import { fetchPayments } from "./fetchPayments";
import type { PaymentsResponse, PaymentsCombinedResponse, PaymentWithType } from "@/types/payments";

interface PaginationState {
  earningsPage: number;
  expensesPage: number;
  earningsTotalPages: number;
  expensesTotalPages: number;
  earningsFinished: boolean;
  expensesFinished: boolean;
}

export async function fetchCombinedPayments(
  page: number,
  limit: number,
  artist: string,
  paginationState: PaginationState
): Promise<PaymentsCombinedResponse> {
  const perRequestLimit = Math.ceil(limit / 2);

  // Only fetch requests that haven't finished
  const shouldFetchEarnings = !paginationState.earningsFinished;
  const shouldFetchExpenses = !paginationState.expensesFinished;

  const promises: Promise<PaymentsResponse>[] = [];

  if (shouldFetchEarnings) {
    promises.push(fetchPayments(paginationState.earningsPage, perRequestLimit, artist));
  }

  if (shouldFetchExpenses) {
    promises.push(fetchPayments(paginationState.expensesPage, perRequestLimit, undefined, artist));
  }

  const responses = await Promise.all(promises);

  // Extract responses
  let earningsResponse: PaymentsResponse | null = null;
  let expensesResponse: PaymentsResponse | null = null;

  let responseIndex = 0;
  if (shouldFetchEarnings) {
    earningsResponse = responses[responseIndex++];
  }
  if (shouldFetchExpenses) {
    expensesResponse = responses[responseIndex++];
  }

  // Update total pages on first fetch
  if (page === 1) {
    if (earningsResponse) {
      paginationState.earningsTotalPages = earningsResponse.pagination.total_pages;
    }
    if (expensesResponse) {
      paginationState.expensesTotalPages = expensesResponse.pagination.total_pages;
    }
  }

  // Check if requests have finished
  if (earningsResponse) {
    const currentPage = earningsResponse.pagination.page;
    if (currentPage >= paginationState.earningsTotalPages) {
      paginationState.earningsFinished = true;
    }
  }

  if (expensesResponse) {
    const currentPage = expensesResponse.pagination.page;
    if (currentPage >= paginationState.expensesTotalPages) {
      paginationState.expensesFinished = true;
    }
  }

  // Add type labels
  const earnings: PaymentWithType[] = (earningsResponse?.payments || []).map((payment) => ({
    ...payment,
    type: "earning" as const,
  }));

  const expenses: PaymentWithType[] = (expensesResponse?.payments || []).map((payment) => ({
    ...payment,
    type: "expense" as const,
  }));

  // Combine and sort by transferred_at (most recent first)
  const combinedPayments = [...earnings, ...expenses].sort(
    (a, b) => new Date(b.transferred_at).getTime() - new Date(a.transferred_at).getTime()
  );

  // Calculate combined pagination
  const totalCount =
    (earningsResponse?.pagination.total_count || 0) +
    (expensesResponse?.pagination.total_count || 0);
  const maxTotalPages = Math.max(
    paginationState.earningsTotalPages,
    paginationState.expensesTotalPages
  );

  return {
    status: "success",
    payments: combinedPayments.slice(0, limit),
    pagination: {
      total_count: totalCount,
      page,
      limit,
      total_pages: maxTotalPages,
    },
    earningsPagination: earningsResponse
      ? {
          page: earningsResponse.pagination.page,
          total_pages: paginationState.earningsTotalPages,
        }
      : {
          page: paginationState.earningsPage,
          total_pages: paginationState.earningsTotalPages,
        },
    expensesPagination: expensesResponse
      ? {
          page: expensesResponse.pagination.page,
          total_pages: paginationState.expensesTotalPages,
        }
      : {
          page: paginationState.expensesPage,
          total_pages: paginationState.expensesTotalPages,
        },
  };
}
