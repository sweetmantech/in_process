import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

const getSmartWallet = async (artist_wallet: Address) => {
  try {
    const response = await fetch(`${IN_PROCESS_API}/smartwallet?artist_wallet=${artist_wallet}`);
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getSmartWallet;
