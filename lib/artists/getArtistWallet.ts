import { Address } from "viem";

const getArtistWallet = async (socialWallet: Address) => {
  try {
    const response = await fetch(`/api/artists/wallets?social_wallet=${socialWallet}`);
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getArtistWallet;
