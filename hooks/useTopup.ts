import { USDC_ADDRESS } from "@/lib/consts";
import { useMemo, useState } from "react";
import { zeroAddress } from "viem";
import { useConnectWallet } from "@privy-io/react-auth";
import useConnectedWallet from "./useConnectedWallet";
import useDeposit from "./useDeposit";

export type DepositCurrency = "usdc" | "eth";

const useTopup = () => {
  const [depositAmount, setDepositAmount] = useState<string>("0.0111");
  const [currency, setCurrency] = useState<DepositCurrency>("usdc");

  const { externalWallet } = useConnectedWallet();
  const { connectWallet } = useConnectWallet();

  const currencyLabel = currency === "usdc" ? "USDC" : "ETH";
  const hasExternalWallet = Boolean(externalWallet);

  const { deposit, isDepositing } = useDeposit({
    currency,
    depositAmount,
    currencyLabel,
  });

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

  return {
    isDepositing,
    depositAmount,
    callData,
    currency,
    setDepositAmount,
    setCurrency,
    currencyLabel,
    hasExternalWallet,
    connectDisconnect,
    deposit,
  };
};

export default useTopup;
