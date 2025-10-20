import { Address, erc20Abi, formatUnits } from "viem";
import { getPublicClient } from "./publicClient";
import { CHAIN_ID, USDC_ADDRESS } from "../consts";

const getBalance = async (address: Address) => {
  const publicClient = getPublicClient(CHAIN_ID);
  const balance = await publicClient.readContract({
    address: USDC_ADDRESS,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  });

  return formatUnits(balance, 6);
};

export default getBalance;
