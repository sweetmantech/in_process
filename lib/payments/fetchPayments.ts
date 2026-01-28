import type { PaymentsResponse } from "@/types/payments";
import { IN_PROCESS_API } from "@/lib/consts";

export async function fetchPayments(
  page = 1,
  limit = 20,
  artist?: string,
  collector?: string
): Promise<PaymentsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (artist) params.append("artist", artist);
  if (collector) params.append("collector", collector);

  const res = await fetch(`${IN_PROCESS_API}/payments?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
}
