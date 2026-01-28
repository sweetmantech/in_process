import { Address } from "viem";
import fetchArtistPayments from "@/lib/payments/fetchArtistPayments";
import { InProcessPayment } from "@/types/payments";

const getTotalEarnings = async (artistAddress: Address): Promise<number> => {
  const payments = await fetchArtistPayments(artistAddress);

  const usdcTotal = payments.reduce(
    (sum: number, payment: InProcessPayment) => sum + Number(payment.amount || 0),
    0
  );

  return usdcTotal;
};

export default getTotalEarnings;
