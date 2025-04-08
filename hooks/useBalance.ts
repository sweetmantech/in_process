import { useEffect, useState } from "react";
import { formatEther, Address } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";

const useBalance = () => {
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState(0);
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const { context } = useFrameProvider();

  useEffect(() => {
    const getBalance = async () => {
      if (!publicClient) return;
      const connectedAddress = context ? address : connectedWallet;
      if (!connectedAddress) return;
      const data = await publicClient.getBalance({
        address: connectedAddress as Address,
      });
      setBalance(parseFloat(formatEther(data)));
    };
    getBalance();
  }, [publicClient, connectedWallet, context, address]);

  return {
    balance,
  };
};

export default useBalance;
