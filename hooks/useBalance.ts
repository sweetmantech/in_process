import { useEffect, useState } from "react";
import { formatEther } from "viem";
import { useAccount, usePublicClient } from "wagmi";

const useBalance = () => {
  const publicClient = usePublicClient();
  const [balance, setBalance] = useState(0);
  const { address } = useAccount();

  useEffect(() => {
    const getBalance = async () => {
      if (!publicClient || !address) return;
      const data = await publicClient.getBalance({
        address,
      });
      setBalance(parseFloat(formatEther(data)));
    };
    getBalance();
  }, [publicClient, address]);

  return {
    balance,
  };
};

export default useBalance;
