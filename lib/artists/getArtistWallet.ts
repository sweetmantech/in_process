import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

const getArtistWallet = async (socialWallet: Address) => {
  try {
    const response = await fetch(`${IN_PROCESS_API}/artists/wallets?social_wallet=${socialWallet}`);
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getArtistWallet;
