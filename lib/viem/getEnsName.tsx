import { mainnet } from "viem/chains";
import { getPublicClient } from "./publicClient";
import { Address } from "viem";
import truncateAddress from "../truncateAddress";

const getEnsName = async (address: Address): Promise<string> => {
  try {
    const publicClient = getPublicClient(mainnet.id);
    const ensName = await publicClient.getEnsName({
      address,
    });

    return ensName as string;
  } catch (error) {
    console.error(error);
    return truncateAddress(address);
  }
};

export default getEnsName;
