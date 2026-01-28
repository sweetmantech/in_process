import { Database } from "@/lib/supabase/types";

export type InProcessPayment = {
  id: string;
  moment: Database["public"]["Tables"]["in_process_moments"]["Row"] & {
    collection: Database["public"]["Tables"]["in_process_collections"]["Row"];
    fee_recipients: Database["public"]["Tables"]["in_process_moment_fee_recipients"]["Row"][];
  };
  buyer: Database["public"]["Tables"]["in_process_artists"]["Row"];
  amount: string;
  transaction_hash: string;
  transferred_at: string;
  currency: string;
};

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
