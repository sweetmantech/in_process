import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

const disconnectSocialWallet = async (social_wallet: Address) => {
  const response = await fetch(`${IN_PROCESS_API}/artists/wallets`, {
    method: "DELETE",
    body: JSON.stringify({
      social_wallet,
    }),
  });
  const data = await response.json();
  return data;
};

export default disconnectSocialWallet;
