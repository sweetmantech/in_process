import { useEffect, useState } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import { toast } from "sonner";
import { usePrivy } from "@privy-io/react-auth";
import { CHAIN_ID } from "@/lib/consts";
import { withdrawApi } from "@/lib/smartwallets/withdrawApi";

export type WithdrawCurrency = "usdc" | "eth";

export const useWithdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [currency, setCurrency] = useState<WithdrawCurrency>("usdc");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const { isExternalWallet, artistWallet } = useUserProvider();
  const [isOpen, setIsOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const { getAccessToken } = usePrivy();
  const {
    getSmartWalletBalances,
    totalUsdcBalance,
    totalEthBalance,
  } = useSocialSmartWalletsBalancesProvider();

  useEffect(() => {
    if (isOpen && isExternalWallet && artistWallet) {
      setRecipientAddress(artistWallet as string);
    } else if (isOpen && !isExternalWallet) {
      setRecipientAddress("");
    }
  }, [isOpen, isExternalWallet, artistWallet]);

  const withdraw = async () => {
    if (!recipientAddress || !withdrawAmount) {
      toast.error("Please fill in all fields");
      return;
    }

    // Check if withdraw amount is valid
    const availableBalance =
      currency === "eth" ? ethBalance : totalUsdcBalance;
    const withdrawAmountNum = parseFloat(withdrawAmount);
    const availableBalanceNum = parseFloat(availableBalance);

    if (isNaN(withdrawAmountNum) || withdrawAmountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmountNum > availableBalanceNum) {
      toast.error(
        `Insufficient balance. Available: ${availableBalance} ${currency.toUpperCase()}`
      );
      return;
    }

    setIsWithdrawing(true);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("No access token found");

      await withdrawApi({
        accessToken,
        amount: withdrawAmount,
        currency,
        to: recipientAddress as `0x${string}`,
        chainId: CHAIN_ID,
      });
      getSmartWalletBalances();
      toast.success("Withdrawal was successful");
    } catch (error: any) {
      toast.error(error?.message || "Failed to withdraw");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    withdrawAmount,
    setWithdrawAmount,
    currency,
    setCurrency,
    recipientAddress,
    setRecipientAddress,
    isOpen,
    setIsOpen,
    withdraw,
    isWithdrawing,
  };
};
