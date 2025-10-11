import { getProfile } from "@/lib/supabase/in_process_artists/getProfile";
import { insertArtistSmartWallet } from "@/lib/supabase/in_process_artist_smart_wallets/insertArtistSmartWallet";
import { upsertProfile } from "@/lib/supabase/in_process_artists/upsertProfile";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { smart_wallet, external_wallet } = body;
  try {
    const smart_wallet_address = smart_wallet.toLowerCase();
    const external_wallet_address = external_wallet.toLowerCase();

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
    const { error } = await insertArtistSmartWallet({
      artist_address: external_wallet_address,
      smart_wallet_address,
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
