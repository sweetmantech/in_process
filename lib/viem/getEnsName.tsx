import { mainnet } from "viem/chains";
import { getPublicClient } from "./publicClient";
import { Address } from "viem";

const getEnsName = async (address: Address): Promise<string> => {
  try {
    const publicClient = getPublicClient(mainnet.id);
    const ensName = await publicClient.getEnsName({
      address,
    });

    return ensName as string;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default getEnsName;
