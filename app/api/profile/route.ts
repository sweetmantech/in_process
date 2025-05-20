import { NextRequest } from "next/server";
import getArtistProfile from "@/lib/getArtistProfile";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  try {
    const walletAddress = req.nextUrl.searchParams.get("walletAddress");
    const profile = await getArtistProfile(walletAddress as Address);
    return Response.json(profile);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get profile.";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
