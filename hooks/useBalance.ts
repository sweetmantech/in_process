import { useEffect, useState } from "react";
import { formatEther, Address } from "viem";
import { usePublicClient } from "wagmi";
import useConnectedWallet from "./useConnectedWallet";

const useBalance = () => {
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState(0);
  const { connectedWallet } = useConnectedWallet();

  useEffect(() => {
    const getBalance = async () => {
      if (!publicClient || !connectedWallet) return;
      const data = await publicClient.getBalance({
        address: connectedWallet as Address,
      });
      setBalance(parseFloat(formatEther(data)));
    };
    getBalance();
  }, [publicClient, connectedWallet]);

  return {
    balance,
  };
};

export default useBalance;
