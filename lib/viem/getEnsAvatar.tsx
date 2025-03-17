import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { createPublicClient, http, PublicClient } from "viem";

const getEnsAvatar = async (ensName: string): Promise<string> => {
  try {
    const publicClient = createPublicClient({
      chain: mainnet,
      transport: http(),
    }) as PublicClient;
    const ensAvatar = await publicClient.getEnsAvatar({
      name: normalize(ensName),
    });

    return ensAvatar as string;
  } catch (error) {
    console.error(error);
    return "https://arweave.net/pL9S3YoTvLqZdSFZLHtJf4UQ1HmCWVv7fSID1kLMlxg";
  }
};

export default getEnsAvatar;
