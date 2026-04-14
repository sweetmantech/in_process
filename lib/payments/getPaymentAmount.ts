import type { PaymentTransferRow, PaymentsTab } from "@/types/payments";
import { zeroAddress } from "viem";

/**
 * Income: transfer value × the signed-in artist's fee percent.
 * Expense: full transfer value.
 */
export const getPaymentAmount = (
  payment: PaymentTransferRow,
  artistWallet: string | undefined,
  paymentsTab: PaymentsTab
): string => {
  const currencyAddress = payment.currency ?? zeroAddress;
  const symbol = currencyAddress === zeroAddress ? "ETH" : "USDC";
  const valueNum = payment.value;

  if (paymentsTab === "income") {
    if (!artistWallet) return `0 ${symbol}`;
    const recipient = payment.moment.fee_recipients.find(
      (r) => r.artist_address.toLowerCase() === artistWallet.toLowerCase()
    );
    if (recipient) {
      const share = valueNum * (recipient.percent_allocation / 100);
      return `${Number(share.toFixed(9))} ${symbol}`;
    }
    return `0 ${symbol}`;
  }

  return `${valueNum} ${symbol}`;
};
