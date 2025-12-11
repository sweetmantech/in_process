import { useQuery } from "@tanstack/react-query";
import type { Payment, PaymentWithType } from "@/types/payments";
import { useUserProvider } from "@/providers/UserProvider";
import { getPaymentAmount } from "@/lib/payments/getPaymentAmount";

/**
 * Calculates the payment amount, accounting for split contracts.
 * If the payout recipient is a split contract, returns the artist's share.
 * Otherwise, returns the full payment amount.
 */
const usePaymentAmount = (payment: Payment | PaymentWithType): string => {
  const { artistWallet } = useUserProvider();

  const { data: amount = "0" } = useQuery({
    queryKey: [
      "paymentAmount",
      payment.moment.collection.payout_recipient,
      payment.moment.collection.chain_id,
      payment.moment.collection.default_admin,
      payment.amount,
      artistWallet,
    ],
    queryFn: () => getPaymentAmount(payment, artistWallet),
    enabled: Boolean(artistWallet && payment.moment.collection.default_admin),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return amount;
};

export default usePaymentAmount;
