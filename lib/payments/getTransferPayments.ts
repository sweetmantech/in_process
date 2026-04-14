import type { PaymentTransferRow, PaymentsTab, TransferPaymentsResponse } from "@/types/payments";
import { CHAIN_ID, IN_PROCESS_API } from "@/lib/consts";

export const getTransferPayments = async (
  page: number,
  limit: number,
  paymentsTab: PaymentsTab,
  walletAddress: string
): Promise<TransferPaymentsResponse> => {
  const params = new URLSearchParams({
    type: "payment",
    chainId: CHAIN_ID.toString(),
    page: String(page),
    limit: String(limit),
  });
  if (paymentsTab === "income") {
    params.set("artist", walletAddress);
  } else {
    params.set("collector", walletAddress);
  }

  const res = await fetch(`${IN_PROCESS_API}/transfers?${params.toString()}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Failed to fetch payments" }));
    throw new Error(err.message ?? "Failed to fetch payments");
  }

  const data: {
    transfers: PaymentTransferRow[];
    pagination: TransferPaymentsResponse["pagination"];
  } = await res.json();

  return {
    transfers: data.transfers ?? [],
    pagination: data.pagination,
  };
};
