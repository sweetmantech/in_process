import { Address } from "viem";
import { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

export interface PaymentsApiResponse {
  status: string;
  payments: InProcessPayment[];
}

<<<<<<< HEAD
const fetchArtistPayments = async (artistAddress: Address): Promise<InProcessPayment[]> => {
  try {
    const response = await fetch(`/api/payments?artist=${(artistAddress as string).toLowerCase()}`);

    if (!response.ok) {
      console.warn(`Failed to fetch payments for artist ${artistAddress}:`, response.status);
=======
const fetchArtistPayments = async (
  artistAddress: Address,
): Promise<InProcessPayment[]> => {
  try {
    const response = await fetch(
      `/api/payments?artist=${(artistAddress as string).toLowerCase()}`,
    );

    if (!response.ok) {
      console.warn(
        `Failed to fetch payments for artist ${artistAddress}:`,
        response.status,
      );
>>>>>>> 8e1db48759342529f34e1b1d337c4a893fcc3c90
      return [];
    }

    const data: PaymentsApiResponse = await response.json();
    return data.payments || [];
  } catch (error) {
<<<<<<< HEAD
    console.error(`Error fetching payments for artist ${artistAddress}:`, error);
=======
    console.error(
      `Error fetching payments for artist ${artistAddress}:`,
      error,
    );
>>>>>>> 8e1db48759342529f34e1b1d337c4a893fcc3c90
    return [];
  }
};

export default fetchArtistPayments;
