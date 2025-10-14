import { upsertProfile } from "@/lib/supabase/in_process_artists/upsertProfile";
import { NextRequest } from "next/server";
import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { Address } from "viem";
import { insertSocialWallet } from "@/lib/supabase/in_process_artist_social_wallets/insertSocialWallet";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { artist_wallet, social_wallet } = body;
  try {
    const artist_wallet_address = artist_wallet.toLowerCase();
    const social_wallet_address = social_wallet.toLowerCase();

    const smart_wallet = await getOrCreateSmartWallet({
      address: artist_wallet_address,
    });
    const { error: upsertError } = await upsertProfile({
      address: artist_wallet_address,
      smart_wallet: smart_wallet.address as Address,
    });
    const { error: insertError } = await insertSocialWallet({
      artist_address: artist_wallet_address,
      social_wallet: social_wallet_address,
    });
    if (upsertError || insertError) throw new Error();
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
