import { Address } from "viem";
import truncateAddress from "./truncateAddress";
import getEnsName from "./viem/getEnsName";
import getEnsAvatar from "./viem/getEnsAvatar";

const getArtistInfo = async (address: Address) => {
  try {
    const ensName = await getEnsName(address);
    let ensAvatar =
      "https://arweave.net/aoRbQVsNJnSdhkwDErFT1Zb0gDJ-M6SBEU0gouifnqo";
    if (ensName) ensAvatar = await getEnsAvatar(ensName);
    return {
      ensName: ensName || truncateAddress(address),
      ensAvatar,
    };
  } catch (error) {
    console.error(error);
    return {
      ensName: truncateAddress(address),
      ensAvatar:
        "https://arweave.net/aoRbQVsNJnSdhkwDErFT1Zb0gDJ-M6SBEU0gouifnqo",
    };
  }
};

export default getArtistInfo;
