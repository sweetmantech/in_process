import { Address } from "viem";
import getSplitRecipients from "./getSplitRecipients";

/**
 * Calculates the amount a specific recipient receives from a split contract.
 * Gets the recipient's allocation percentage and multiplies by the total amount.
 */
const getSplitRecipientAmount = async (
  splitAddress: Address,
  chainId: number,
  recipientAddress: Address,
  totalAmount: string
): Promise<string> => {
  const recipients = await getSplitRecipients(splitAddress, chainId);

  // Find the recipient's allocation percentage
  const recipient = recipients.find(
    (r) => r.recipient.address.toLowerCase() === recipientAddress.toLowerCase()
  );

  if (!recipient) {
    // If recipient not found in split, return 0
    return "0";
  }

  // Calculate amount: (percentage / 100) * totalAmount
  const totalAmountNumber = parseFloat(totalAmount);
  const percentage = recipient.percentAllocation || 0;
  const calculatedAmount = (percentage / 100) * totalAmountNumber;

  return calculatedAmount.toFixed(6);
};

export default getSplitRecipientAmount;
