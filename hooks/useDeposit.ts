import { USDC_ADDRESS, CHAIN_ID } from "@/lib/consts";
import { useState } from "react";
import { createWalletClient, custom, parseEther, parseUnits, erc20Abi, Address } from "viem";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import useConnectedWallet from "./useConnectedWallet";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { toast } from "sonner";
import { DepositCurrency } from "./useTopup";
import { isUserRejection } from "@/lib/utils/isUserRejection";

interface UseDepositParams {
  currency: DepositCurrency;
  depositAmount: string;
  currencyLabel: string;
}

const useDeposit = ({ currency, depositAmount, currencyLabel }: UseDepositParams) => {
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const { fetchSmartWallet, smartWallet } = useSmartWalletProvider();
  const { externalWallet } = useConnectedWallet();

  const deposit = async () => {
    if (!externalWallet || !smartWallet) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsDepositing(true);
      await externalWallet.switchChain(CHAIN_ID);
      const provider = await externalWallet.getEthereumProvider();
      const account = externalWallet.address as Address;
      const client = createWalletClient({
        account,
        chain: getViemNetwork(CHAIN_ID),
        transport: custom(provider),
      });

      let hash: Address;

      if (currency === "eth") {
        // Send native ETH
        hash = await client.sendTransaction({
          to: smartWallet as Address,
          value: parseEther(depositAmount),
        });
      } else {
        // Send USDC via ERC20 transfer
        hash = await client.writeContract({
          address: USDC_ADDRESS as Address,
          abi: erc20Abi,
          functionName: "transfer",
          args: [smartWallet as Address, parseUnits(depositAmount, 6)],
        });
      }

      const publicClient = getPublicClient(CHAIN_ID);
      await publicClient.waitForTransactionReceipt({ hash });

      toast.success(`Successfully deposited ${depositAmount} ${currencyLabel}`);
      fetchSmartWallet();
    } catch (error: any) {
      console.error("Deposit error:", error);

      if (isUserRejection(error)) {
        toast.error("Depositor rejected the request");
      } else {
        toast.error(error?.message || "Failed to deposit. Please try again.");
      }
    } finally {
      setIsDepositing(false);
    }
  };

  return {
    deposit,
    isDepositing,
  };
};

export default useDeposit;
