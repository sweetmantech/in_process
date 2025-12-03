import { useQuery } from "@tanstack/react-query";
import type { Payment, PaymentWithType } from "./usePayments";
import { useUserProvider } from "@/providers/UserProvider";

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
    queryFn: async () => {
      const feeRecipients = payment.moment.fee_recipients;
      const percentAllocation = feeRecipients.find(
        (recipient) =>
          recipient.artist_address?.toLowerCase() ===
          payment.moment.collection.default_admin?.toLowerCase()
      )?.percent_allocation;

      if (percentAllocation) {
        return ((parseFloat(payment.amount) * percentAllocation) / 100).toFixed(2);
      }
      return payment.amount;
    },
    enabled: Boolean(artistWallet && payment.moment.collection.default_admin),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return amount;
};

export default usePaymentAmount;
