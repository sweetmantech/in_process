import type { PaymentsCombinedResponse } from "@/types/payments";

export function getNextCombinedPage(lastPage: PaymentsCombinedResponse): number | undefined {
  const earningsHasMore =
    lastPage.earningsPagination &&
    lastPage.earningsPagination.page < lastPage.earningsPagination.total_pages;

  const expensesHasMore =
    lastPage.expensesPagination &&
    lastPage.expensesPagination.page < lastPage.expensesPagination.total_pages;

  if (earningsHasMore || expensesHasMore) {
    return lastPage.pagination.page + 1;
  }

  return undefined;
}
