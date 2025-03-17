import { mainnet } from "viem/chains";
import { getPublicClient } from "./publicClient";
import { normalize } from "viem/ens";

const getEnsAvatar = async (ensName: string): Promise<string> => {
  try {
    const publicClient = getPublicClient(mainnet.id);
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
