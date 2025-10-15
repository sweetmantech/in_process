import { Address } from "viem";

const connectSocialWallet = async (artist_wallet: Address, social_wallet: Address) => {
  const response = await fetch(`/api/artists/wallets`, {
    method: "POST",
    body: JSON.stringify({
      artist_wallet,
      social_wallet,
    }),
  });
  const data = await response.json();
  return data;
};

export default connectSocialWallet;
