import { Address } from "viem";
import fetchArtistPayments from "@/lib/payments/fetchArtistPayments";
import { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

const getTotalEarnings = async (artistAddress: Address): Promise<number> => {
  const payments = await fetchArtistPayments(artistAddress);

  const usdcTotal = payments.reduce(
    (sum: number, payment: InProcessPayment) =>
      sum + Number(payment.amount || 0),
    0
  );

  return usdcTotal;
};

export default getTotalEarnings;
