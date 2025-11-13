import { useEffect, useState } from "react";
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
  const [amount, setAmount] = useState("0");

  useEffect(() => {
    const calculateAmount = async () => {
      if (!payment.token.payoutRecipient) {
        setAmount(payment.amount);
        return;
      }

      const isSplit = await isSplitContract(
        payment.token.payoutRecipient as Address,
        payment.token.chainId
      );

      if (isSplit) {
        const artistAddress = payment.token.defaultAdmin as Address;
        const splitAmount = await getSplitRecipientAmount(
          payment.token.payoutRecipient as Address,
          payment.token.chainId,
          artistAddress,
          payment.amount
        );
        setAmount(splitAmount);
      } else {
        setAmount(payment.amount);
      }
    };

    calculateAmount();
  }, [
    payment.token.payoutRecipient,
    payment.token.chainId,
    payment.token.defaultAdmin,
    payment.amount,
  ]);

  return amount;
};

export default usePaymentAmount;
