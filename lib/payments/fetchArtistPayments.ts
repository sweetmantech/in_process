import { Address } from "viem";
import { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

export interface PaymentsApiResponse {
  status: string;
  payments: InProcessPayment[];
}

const fetchArtistPayments = async (
  artistAddress: Address
): Promise<InProcessPayment[]> => {
  try {
    const response = await fetch(
      `/api/payments?artist=${(artistAddress as string).toLowerCase()}`
    );

    if (!response.ok) {
      console.warn(
        `Failed to fetch payments for artist ${artistAddress}:`,
        response.status
      );
      return [];
    }

    const data: PaymentsApiResponse = await response.json();
    return data.payments || [];
  } catch (error) {
    console.error(
      `Error fetching payments for artist ${artistAddress}:`,
      error
    );
    return [];
  }
};

export default fetchArtistPayments;
