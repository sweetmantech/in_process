import { Address } from "viem";
import { EvmSmartAccount } from "@coinbase/cdp-sdk";
import { selectSocialWallets } from "@/lib/supabase/in_process_artist_social_wallets/selectSocialWallets";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";

export interface SmartWallet {
  address: Address;
  smartWallet: EvmSmartAccount;
}

export async function getSocialSmartWallets(artistAddress: Address): Promise<SmartWallet[]> {
  const { data: socialWallets, error } = await selectSocialWallets({
    artistAddress,
  });

  if (error || !socialWallets) throw new Error("Failed to fetch social wallets");

  const socials = socialWallets.map((social) => social.social_wallet as Address);

  const socialSmartWallets: SmartWallet[] = [];
  if (socials.length) {
    for (const social of socials) {
      const smartWallet = await getOrCreateSmartWallet({ address: social });
      socialSmartWallets.push({
        address: social,
        smartWallet,
      });
      new Promise((resolve) => setTimeout(resolve, 200));
    }
  } else {
    const artistSmartWallet = await getOrCreateSmartWallet({ address: artistAddress });
    socialSmartWallets.push({
      address: artistAddress,
      smartWallet: artistSmartWallet,
    });
  }

  return socialSmartWallets;
}
