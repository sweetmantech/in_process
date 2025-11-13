import { Address } from "viem";
import { getPublicClient } from "../viem/publicClient";
import { CHAIN_ID } from "../consts";

const getEthBalance = async (address: Address) => {
  const publicClient = getPublicClient(CHAIN_ID);
  const balance = await publicClient.getBalance({
    address,
  });

  return balance;
};

export default getEthBalance;
