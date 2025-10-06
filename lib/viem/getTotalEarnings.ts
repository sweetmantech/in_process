import { Address } from "viem";
import fetchArtistPayments from "@/lib/payments/fetchArtistPayments";
import { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

const getTotalEarnings = async (artistAddress: Address): Promise<number> => {
  const payments = await fetchArtistPayments(artistAddress);

  const usdcTotal = payments.reduce(
<<<<<<< HEAD
    (sum: number, payment: InProcessPayment) => sum + Number(payment.amount || 0),
    0
=======
    (sum: number, payment: InProcessPayment) =>
      sum + Number(payment.amount || 0),
    0,
>>>>>>> 8e1db48759342529f34e1b1d337c4a893fcc3c90
  );

  return usdcTotal;
};

export default getTotalEarnings;
