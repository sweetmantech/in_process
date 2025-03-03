import getZoraProfile from "@/lib/zora/getZoraProfile";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  try {
    const walletAddress = req.nextUrl.searchParams.get("walletAddress");
    const profile = await getZoraProfile(walletAddress as Address);
    return Response.json(profile);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to generate JWT";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
