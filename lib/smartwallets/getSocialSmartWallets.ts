import { Address } from "viem";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";
import { selectSocialWallets } from "@/lib/supabase/in_process_artist_social_wallets/selectSocialWallets";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";

export async function getSocialSmartWallets(artistAddress: Address): Promise<EvmSmartAccount[]> {
  const { data: socialWallets, error } = await selectSocialWallets({
    artistAddress,
  });

  if (error || !socialWallets) throw new Error("Failed to fetch social wallets");

  const socials = socialWallets.map((social) => social.social_wallet as Address);

  const socialSmartWallets = [];
  if (socials.length) {
    for (const social of socials) {
      const smartwallet = await getOrCreateSmartWallet({ address: social });
      socialSmartWallets.push(smartwallet);
    }
  } else {
    const artistSmartWallet = await getOrCreateSmartWallet({ address: artistAddress });
    socialSmartWallets.push(artistSmartWallet);
  }

  return socialSmartWallets;
}
