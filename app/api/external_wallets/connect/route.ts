import { getOrCreateAccount } from "@/lib/coinbase/getOrCreateAccount";
import { connectSmartWalletToArtist } from "@/lib/supabase/in_process_artist_smart_wallets/connectSmartWalletToArtist";
import { getProfile } from "@/lib/supabase/in_process_artists/getProfile";
import { upsertProfile } from "@/lib/supabase/in_process_artists/upsertProfile";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { account, external_wallet } = body;
  try {
    const account_address = account.toLowerCase();
    const external_wallet_address = external_wallet.toLowerCase();

    const smartWallet = await getOrCreateAccount({
      address: account_address,
    });
    const profile = await getProfile(external_wallet_address);
    if (!profile) {
      await upsertProfile({
        address: external_wallet_address,
        username: "",
        bio: "",
        twitter_username: "",
        instagram_username: "",
        farcaster_username: "",
        telegram_username: "",
      });
    }
    const { error } = await connectSmartWalletToArtist({
      artist_address: external_wallet_address,
      smart_wallet_address: smartWallet.address.toLowerCase() as Address,
    });
    if (error) throw new Error();
    return Response.json({ success: true });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to connect.";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
