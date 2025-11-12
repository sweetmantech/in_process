import { USDC_ADDRESS, CHAIN_ID } from "@/lib/consts";
import { useMemo, useState } from "react";
import {
  zeroAddress,
  createWalletClient,
  custom,
  parseEther,
  parseUnits,
  erc20Abi,
  Address,
} from "viem";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import useConnectedWallet from "./useConnectedWallet";
import { useConnectWallet } from "@privy-io/react-auth";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { toast } from "sonner";

export type DepositCurrency = "usdc" | "eth";

const useTopup = () => {
  const [depositAmount, setDepositAmount] = useState<string>("0.0111");
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
  const [currency, setCurrency] = useState<DepositCurrency>("usdc");

  const { fetchSmartWallet, smartWallet } = useSmartWalletProvider();
  const { externalWallet } = useConnectedWallet();
  const { connectWallet } = useConnectWallet();

  const currencyLabel = currency === "usdc" ? "USDC" : "ETH";
  const hasExternalWallet = Boolean(externalWallet);

  const callData = useMemo(() => {
    return {
      totalPrice: depositAmount,
      _usdc: currency === "usdc" ? USDC_ADDRESS : zeroAddress,
    };
  }, [depositAmount, currency]);

  const connectDisconnect = () => {
    if (!hasExternalWallet) {
      connectWallet();
    } else {
      externalWallet?.disconnect();
    }
  };

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

      let hash: `0x${string}`;

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
      toast.error(error?.message || "Failed to deposit. Please try again.");
    } finally {
      setIsDepositing(false);
    }
  };

  return {
    isDepositing,
    depositAmount,
    callData,
    currency,
    setDepositAmount,
    setIsDepositing,
    setCurrency,
    currencyLabel,
    hasExternalWallet,
    connectDisconnect,
    deposit,
  };
};

export default useTopup;
