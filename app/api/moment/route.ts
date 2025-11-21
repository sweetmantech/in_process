import { NextRequest, NextResponse } from "next/server";
import { getAddress } from "viem";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import { getMomentSchema } from "@/lib/schema/getMomentSchema";
import { selectInProcessToken } from "@/lib/supabase/in_process_tokens/selectInProcessToken";
import { CHAIN_ID } from "@/lib/consts";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      tokenContract: searchParams.get("tokenContract"),
      tokenId: searchParams.get("tokenId"),
      chainId: searchParams.get("chainId"),
    };

    const parseResult = getMomentSchema.safeParse(queryParams);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json(
        { error: "Invalid query parameters", errors: errorDetails },
        { status: 400 }
      );
    }

    const { tokenContract, tokenId, chainId } = parseResult.data;
    const chainIdNum = chainId ? parseInt(chainId, 10) : CHAIN_ID;

    // Get token info from chain
    const tokenInfo = await getTokenInfo(getAddress(tokenContract), tokenId, chainIdNum);

    if (!tokenInfo.tokenUri) {
      return NextResponse.json({ error: "Token URI not found" }, { status: 404 });
    }

    // Fetch metadata from URI
    const metadata = await fetchTokenMetadata(tokenInfo.tokenUri);

    const token = await selectInProcessToken({
      address: getAddress(tokenContract),
      chainId: chainIdNum,
    });

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    // Validate saleConfig exists and has all required fields
    if (!tokenInfo.saleConfig) {
      return NextResponse.json(
        { error: "Sale configuration not found for this token" },
        { status: 400 }
      );
    }

    const { pricePerToken, saleStart, saleEnd, maxTokensPerAddress } = tokenInfo.saleConfig;

    const saleConfig: any = {
      ...tokenInfo.saleConfig,
      pricePerToken: pricePerToken.toString(),
      saleStart: Number(saleStart),
      saleEnd: Number(saleEnd),
      maxTokensPerAddress: Number(maxTokensPerAddress),
    };

    return NextResponse.json({
      uri: tokenInfo.tokenUri,
      owner: getAddress(tokenInfo.owner),
      saleConfig,
      momentAdmins: token.token_admins.map((admin) => admin.artist_address),
      metadata: {
        name: metadata.name || "",
        image: metadata.image || "",
        description: metadata.description || "",
        content: metadata.content || null,
      },
    });
  } catch (error: any) {
    console.error("Error fetching moment info:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch moment info" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
