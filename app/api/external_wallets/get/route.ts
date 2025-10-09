import { getOrCreateAccount } from "@/lib/coinbase/getOrCreateAccount";
import { connectSmartWalletToArtist } from "@/lib/supabase/in_process_artist_smart_wallets/connectSmartWalletToArtist";
import { getProfile } from "@/lib/supabase/in_process_artists/getProfile";
import { upsertProfile } from "@/lib/supabase/in_process_artists/upsertProfile";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest) {
    const address = req.nextUrl.searchParams.get("address");
  try {
    const smartWallet = await getOrCreateAccount({
      address: address as Address,
    });
    
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
