import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { useUserProvider } from "@/providers/UserProvider";
import type { Payment, PaymentWithType } from "@/types/payments";

export const usePaymentType = (payment: Payment | PaymentWithType): { isExpense: boolean } => {
  const { smartWallet } = useSmartWalletProvider();
  const { artistWallet } = useUserProvider();

  const isExpense = !(
    payment.buyer.address.toLowerCase() === artistWallet?.toLowerCase() ||
    payment.buyer.address.toLowerCase() === smartWallet?.toLowerCase()
  );

  return {
    isExpense,
  };
};
