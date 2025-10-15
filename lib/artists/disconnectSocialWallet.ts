import { Address } from "viem";

const disconnectSocialWallet = async (social_wallet: Address) => {
  const response = await fetch(`/api/artists/wallets`, {
    method: "DELETE",
    body: JSON.stringify({
      social_wallet,
    }),
  });
  const data = await response.json();
  return data;
};

export default disconnectSocialWallet;
