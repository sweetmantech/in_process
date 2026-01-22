import { getArtistWallet } from "../supabase/in_process_artist_social_wallets/getArtistWallet";
import privyClient from "./client";

export async function getArtistAddressByAuthToken(
  authToken: string
): Promise<{ artistAddress: string | undefined; socialWallet: string | undefined }> {
  const verified = await privyClient.utils().auth().verifyAuthToken(authToken);
  if (!verified) throw new Error("Invalid authentication token");

  const url = `https://api.privy.io/v1/users/${verified.user_id}`;
  const options = {
    method: "GET",
    headers: {
      "privy-app-id": process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      Authorization: `Basic ${btoa(process.env.NEXT_PUBLIC_PRIVY_APP_ID! + ":" + process.env.PRIVY_API_KEY!)}`,
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();
  const socialAccount = data.linked_accounts.find(
    (account: any) => account.wallet_client_type === "privy"
  );
  if (socialAccount?.address) {
    const { data: artistData } = await getArtistWallet({
      social_wallet: socialAccount.address.toLowerCase(),
    });
    if (artistData)
      return {
        artistAddress: artistData.artist_address,
        socialWallet: socialAccount.address,
      };
    return {
      artistAddress: undefined,
      socialWallet: socialAccount.address,
    };
  }
  const externalAccount = data.linked_accounts.find(
    (account: any) => account.wallet_client_type !== "privy" && account.type === "wallet"
  );
  if (externalAccount?.address) {
    return {
      artistAddress: externalAccount.address,
      socialWallet: undefined,
    };
  }
  throw new Error("No social or artist wallet found");
}
