import getSmartWallet from "@/lib/smartwallets/getSmartWallet";
import getBalance from "@/lib/viem/getBalance";
import { useUserProvider } from "@/providers/UserProvider";
import { useCallback, useEffect, useState } from "react";
import { Address, formatEther } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";

const useSmartWallet = () => {
  const [smartWallet, setSmartWallet] = useState<string>("");
  const { artistWallet } = useUserProvider();
  const [balance, setBalance] = useState<string>("0.00");
  const [ethBalance, setEthBalance] = useState<string>("0.00");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchSmartWallet = useCallback(async () => {
    if (!artistWallet) return;
    const smartWallet = await getSmartWallet(artistWallet);
    setSmartWallet(smartWallet as Address);

    // Fetch USDC balance
    const usdcBalance = await getBalance(smartWallet);
    setBalance(usdcBalance);

    // Fetch ETH balance
    const publicClient = getPublicClient(CHAIN_ID);
    const ethBalanceWei = await publicClient.getBalance({
      address: smartWallet as Address,
    });
    setEthBalance(formatEther(ethBalanceWei));

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
    ethBalance,
    fetchSmartWallet,
  };
};

export default useSmartWallet;
