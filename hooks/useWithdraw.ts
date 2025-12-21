import { useState } from "react";
import { Address, encodeFunctionData, erc20Abi, Hash, parseEther, parseUnits } from "viem";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import { toast } from "sonner";
import { useSendTransaction } from "@privy-io/react-auth";
import { useUserProvider } from "@/providers/UserProvider";
import { publicClient } from "@/lib/viem/publicClient";

type WithdrawCurrency = "usdc" | "eth";

interface UseWithdrawParams {
  currency: WithdrawCurrency;
  withdrawAmount: string;
  recipientAddress: Address;
}

const useWithdraw = () => {
  const [isWithdrawing, setIsWithdrawing] = useState<boolean>(false);
  const { connectedAddress } = useUserProvider();
  const { sendTransaction } = useSendTransaction();

  const withdraw = async ({ currency, withdrawAmount, recipientAddress }: UseWithdrawParams) => {
    if (!connectedAddress) {
      toast.error("Please connect your social wallet first");
      return;
    }

    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      toast.error("Please enter a valid withdrawal amount");
      return;
    }

    setIsWithdrawing(true);
    try {
      let transaction:
        | {
            hash: Hash;
          }
        | undefined;
      if (currency === "usdc") {
        transaction = await sendTransaction({
          to: USDC_ADDRESS,
          data: encodeFunctionData({
            abi: erc20Abi,
            functionName: "transfer",
            args: [recipientAddress, parseUnits(withdrawAmount, 6)],
          }),
          chainId: CHAIN_ID,
        });
      }
      if (currency === "eth") {
        transaction = await sendTransaction({
          to: recipientAddress,
          value: parseEther(withdrawAmount),
          chainId: CHAIN_ID,
        });
      }

      if (!transaction) {
        toast.error("Withdrawal failed");
        setIsWithdrawing(false);
        return;
      }

      toast.info("Transaction submitted, waiting for confirmation...");
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: transaction.hash,
      });

      if (receipt.status === "success") {
        toast.success("Withdrawal successful");
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Withdrawal failed");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return {
    withdraw,
    isWithdrawing,
  };
};

export default useWithdraw;
