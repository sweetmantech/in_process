import getSmartWallet from "@/lib/smartwallets/getSmartWallet";
import getBalance from "@/lib/viem/getBalance";
import { useUserProvider } from "@/providers/UserProvider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Address } from "viem";

const useSmartWallet = () => {
  const [smartWallet, setSmartWallet] = useState<string>("");
  const { artistWallet } = useUserProvider();
  const [balance, setBalance] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSmartWallet = useCallback(async () => {
    if (!artistWallet) return;
    const smartWallet = await getSmartWallet(artistWallet);
    setSmartWallet(smartWallet as Address);
    const balance = await getBalance(smartWallet);
    setBalance(balance);
    setIsLoading(false);
  }, [artistWallet]);

  useEffect(() => {
    setTimeout(() => {
      fetchSmartWallet();
    }, 1000);
  }, [fetchSmartWallet]);

  return {
    smartWallet,
    isLoading,
    balance,
    fetchSmartWallet,
  };
};

export default useSmartWallet;
