import type { PaymentsResponse } from "@/types/payments";

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

  const res = await fetch(`/api/payments?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
}
