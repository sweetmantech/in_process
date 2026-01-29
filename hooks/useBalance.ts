import { useEffect, useState } from "react";
import { Address, erc20Abi } from "viem";
import { usePublicClient } from "wagmi";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import useConnectedWallet from "./useConnectedWallet";

const useBalance = () => {
  const publicClient = usePublicClient();
  const [ethBalance, setEthBalance] = useState(BigInt(0));
  const [usdcBalance, setUsdcBalance] = useState(BigInt(0));
  const { privyWallet } = useConnectedWallet();

  useEffect(() => {
    const getBalance = async () => {
      if (!publicClient) return;
      if (!privyWallet?.address) return;
      let data = await publicClient.getBalance({
        address: privyWallet.address as Address,
      });
      setEthBalance(data);

      data = await publicClient.readContract({
        address: USDC_ADDRESS[CHAIN_ID],
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [privyWallet.address as Address],
      });
      setUsdcBalance(data);
    };
    getBalance();
  }, [publicClient, privyWallet]);

  return {
    ethBalance,
    usdcBalance,
  };
};

export default useBalance;
