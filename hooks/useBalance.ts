import { useEffect, useState } from "react";
import { formatEther, Address, erc20Abi, formatUnits } from "viem";
import { useAccount, usePublicClient } from "wagmi";
import useConnectedWallet from "./useConnectedWallet";
import { useFrameProvider } from "@/providers/FrameProvider";
import { USDC_ADDRESS } from "@/lib/consts";

const useBalance = () => {
  const publicClient = usePublicClient();
  const [ethBalance, setEthBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const { connectedWallet } = useConnectedWallet();
  const { address } = useAccount();
  const { context } = useFrameProvider();

  useEffect(() => {
    const getBalance = async () => {
      if (!publicClient) return;
      const connectedAddress = context ? address : connectedWallet;
      if (!connectedAddress) return;
      let data = await publicClient.getBalance({
        address: connectedAddress as Address,
      });
      setEthBalance(parseFloat(formatEther(data)));

      data = await publicClient.readContract({
        address: USDC_ADDRESS,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [connectedAddress as Address],
      });
      setUsdcBalance(parseFloat(formatUnits(data, 6)));
    };
    getBalance();
  }, [publicClient, connectedWallet, context, address]);

  return {
    ethBalance,
    usdcBalance,
  };
};

export default useBalance;
