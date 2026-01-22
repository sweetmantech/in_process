import { NextRequest, NextResponse } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { Address } from "viem";
import { migrateWallet } from "@/lib/wallets/migrateWallet";
import { getAddressesByAuthToken } from "@/lib/privy/getAddressesByAuthToken";
import { getBearerToken } from "@/lib/api-keys/getBearerToken";
import { z } from "zod";

const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    // Get authentication token
    const authHeader = req.headers.get("authorization");
    const authToken = getBearerToken(authHeader);
    if (!authToken) {
      return NextResponse.json(
        { message: "Authorization header with Bearer token required" },
        { status: 401, headers: corsHeaders }
      );
    }

    // Get addresses from auth token
    const { artistAddress, socialWallet } =
      await getAddressesByAuthToken(authToken);

    if (!artistAddress || !socialWallet) {
      return NextResponse.json(
        { message: "Artist address and social wallet are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Perform migration
    const result = await migrateWallet({
      socialWallet: socialWallet as Address,
      artistWallet: artistAddress as Address  ,
    });

    return NextResponse.json(result, { headers: corsHeaders });
  } catch (error: any) {
    console.error("Error in wallet migration:", error);
    return NextResponse.json(
      { message: error?.message || "Failed to migrate wallet" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
