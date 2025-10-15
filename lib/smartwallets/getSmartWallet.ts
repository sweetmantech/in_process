import { Address } from "viem";

const getSmartWallet = async (artist_wallet: Address) => {
  try {
    const response = await fetch(`/api/smartwallet?artist_wallet=${artist_wallet}`);
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getSmartWallet;
