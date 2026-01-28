import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

const connectSocialWallet = async (artist_wallet: Address, social_wallet: Address) => {
  const response = await fetch(`${IN_PROCESS_API}/artists/wallets`, {
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
