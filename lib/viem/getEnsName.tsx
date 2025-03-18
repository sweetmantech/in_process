import { mainnet } from "viem/chains";
import { Address, createPublicClient, http, PublicClient } from "viem";

const getEnsName = async (address: Address): Promise<string> => {
  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    }) as PublicClient;
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
