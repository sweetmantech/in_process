import { getOrCreateSmartWallet } from "@/lib/coinbase/getOrCreateSmartWallet";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const artist_wallet = searchParams.get("artist_wallet") as Address;
  try {
    const smartAccount = await getOrCreateSmartWallet({
      address: artist_wallet,
    });
    return Response.json({
      address: smartAccount.address.toLowerCase(),
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get smart wallet.";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
