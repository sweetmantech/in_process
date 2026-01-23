import { useEffect, useState } from "react";
import { Address, erc20Abi } from "viem";
import { usePublicClient } from "wagmi";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";
import useSignedAddress from "./useSignedAddress";

const useBalance = () => {
  const publicClient = usePublicClient();
  const [ethBalance, setEthBalance] = useState(BigInt(0));
  const [usdcBalance, setUsdcBalance] = useState(BigInt(0));
  const signedAddress = useSignedAddress();

  useEffect(() => {
    const getBalance = async () => {
      if (!publicClient) return;
      if (!signedAddress) return;
      let data = await publicClient.getBalance({
        address: signedAddress as Address,
      });
      setEthBalance(data);

      data = await publicClient.readContract({
        address: USDC_ADDRESS[CHAIN_ID],
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [signedAddress as Address],
      });
      setUsdcBalance(data);
    };
    getBalance();
  }, [publicClient, signedAddress]);

  return {
    ethBalance,
    usdcBalance,
  };
};

export default useBalance;
