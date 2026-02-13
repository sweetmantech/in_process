export type InProcessPayment = {
  id: string;
  moment: {
    id: string;
    token_id: number;
    uri: string;
    collection: {
      address: string;
      chain_id: number;
      default_admin: string;
      payout_recipient: string;
    };
    fee_recipients: Array<{
      artist_address: string;
      percent_allocation: number;
    }>;
  };
  buyer: {
    address: string;
    username: string | null;
  };
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
