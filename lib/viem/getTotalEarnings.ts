import { Collection } from "@/types/token";
import { Address } from "viem";
import fetchArtistPayments from "@/lib/payments/fetchArtistPayments";
import getEthArtistPayments from "@/lib/payments/getEthArtistPayments";
import { InProcessPayment } from "@/lib/supabase/in_process_payments/selectPayments";

interface TotalEarnings {
  eth: string;
  usdc: string;
}

const getTotalEarnings = async (
  collections: Collection[],
  artistAddress: Address
): Promise<TotalEarnings> => {
  const [ethEarnings, payments] = await Promise.all([
    getEthArtistPayments(collections),
    fetchArtistPayments(artistAddress),
  ]);

  const usdcTotal = payments.reduce(
    (sum: number, payment: InProcessPayment) =>
      sum + Number(payment.amount || 0),
    0
  );

  return {
    eth: ethEarnings,
    usdc: usdcTotal.toFixed(2),
  };
};

export default getTotalEarnings;
