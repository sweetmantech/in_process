import { Address, erc20Abi, formatUnits } from "viem";
import { getPublicClient } from "../viem/publicClient";
import { CHAIN_ID, USDC_ADDRESS } from "../consts";

const getUsdcBalance = async (address: Address): Promise<string> => {
  const publicClient = getPublicClient(CHAIN_ID);
  const balance = await publicClient.readContract({
    address: USDC_ADDRESS[CHAIN_ID],
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  });

  return formatUnits(balance, 6);
};

export default getUsdcBalance;
