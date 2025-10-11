import { getExternalWallets } from "@/lib/supabase/in_process_artist_smart_wallets/getExternalWallets";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const smart_wallet = searchParams.get("smart_wallet") as Address;
  try {
    const smart_wallet_address = smart_wallet.toLowerCase();
    const data = await getExternalWallets(smart_wallet_address as Address);
    return Response.json({
      address: data?.artist_address,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get external wallet.";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
