import type { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

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

export interface PaymentsCombinedResponse extends PaymentsResponse {
  payments: PaymentWithType[];
  earningsPagination?: {
    page: number;
    total_pages: number;
  };
  expensesPagination?: {
    page: number;
    total_pages: number;
  };
}

export interface CombinedPaginationState {
  earningsPage: number;
  expensesPage: number;
  earningsTotalPages: number;
  expensesTotalPages: number;
  earningsFinished: boolean;
  expensesFinished: boolean;
}
