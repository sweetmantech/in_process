import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import type { Payment, PaymentWithType } from "./usePayments";
import isSplitContract from "@/lib/splits/isSplitContract";
import getSplitRecipientAmount from "@/lib/splits/getSplitRecipientAmount";

/**
 * Calculates the payment amount, accounting for split contracts.
 * If the payout recipient is a split contract, returns the artist's share.
 * Otherwise, returns the full payment amount.
 */
const usePaymentAmount = (payment: Payment | PaymentWithType): string => {
  const { data: amount = "0" } = useQuery({
    queryKey: [
      "paymentAmount",
      payment.token.payoutRecipient,
      payment.token.chainId,
      payment.token.defaultAdmin,
      payment.amount,
    ],
    queryFn: async () => {
      if (!payment.token.payoutRecipient) {
        return payment.amount;
      }

      const isSplit = await isSplitContract(
        payment.token.payoutRecipient as Address,
        payment.token.chainId
      );

      if (isSplit) {
        const artistAddress = payment.token.defaultAdmin as Address;
        return await getSplitRecipientAmount(
          payment.token.payoutRecipient as Address,
          payment.token.chainId,
          artistAddress,
          payment.amount
        );
      }

      return payment.amount;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: (failureCount) => failureCount < 3,
  });

  return amount;
};

export default usePaymentAmount;
