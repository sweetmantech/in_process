import type { Payment, PaymentWithType } from "@/types/payments";
import { zeroAddress } from "viem";

/**
 * Calculates the payment amount, accounting for split contracts.
 * If the payout recipient is a split contract, returns the artist's share.
 * Otherwise, returns the full payment amount.
 */
export const getPaymentAmount = async (
  payment: Payment | PaymentWithType,
  artistWallet: string | undefined
): Promise<string> => {
  const feeRecipients = payment.moment.fee_recipients;
  const percentAllocation = feeRecipients.find(
    (recipient) =>
      recipient.artist_address?.toLowerCase() ===
      payment.moment.collection.default_admin?.toLowerCase()
  )?.percent_allocation;

  const symbol = payment.currency === zeroAddress ? "ETH" : "USDC";

  if (
    percentAllocation &&
    (payment.moment.collection.default_admin === artistWallet?.toLowerCase() ||
      payment.moment.fee_recipients.find(
        (recipient) => recipient.artist_address === artistWallet?.toLowerCase()
      ))
  ) {
    return `${Number((Number(payment.amount) * (percentAllocation / 100)).toFixed(9))} ${symbol}`;
  }
  return `${Number(Number(payment.amount).toFixed(9))} ${symbol}`;
};
