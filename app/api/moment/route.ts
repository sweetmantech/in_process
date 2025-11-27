import { NextRequest, NextResponse } from "next/server";
import { getAddress } from "viem";
import getMomentOnChainInfo from "@/lib/viem/getTokenInfo";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import { getMomentSchema } from "@/lib/schema/getMomentSchema";
import { selectInProcessToken } from "@/lib/supabase/in_process_tokens/selectInProcessToken";
import { Moment } from "@/types/moment";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      collectionAddress: searchParams.get("collectionAddress"),
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

    const { collectionAddress, tokenId, chainId } = parseResult.data;
    const chainIdNum = parseInt(chainId, 10);
    const moment: Moment = {
      collectionAddress: getAddress(collectionAddress),
      tokenId,
      chainId: chainIdNum,
    };

    const momentdata = await getMomentOnChainInfo(moment);

    if (!momentdata.tokenUri) {
      return NextResponse.json({ error: "Token URI not found" }, { status: 404 });
    }

    // Fetch metadata from URI
    const metadata = await fetchTokenMetadata(momentdata.tokenUri);

    const token = await selectInProcessToken({
      address: getAddress(collectionAddress),
      chainId: chainIdNum,
    });

    if (!token) {
      return NextResponse.json({ error: "Token not found" }, { status: 404 });
    }

    // Validate saleConfig exists and has all required fields
    if (!momentdata.saleConfig) {
      return NextResponse.json(
        { error: "Sale configuration not found for this token" },
        { status: 400 }
      );
    }

    const { pricePerToken, saleStart, saleEnd, maxTokensPerAddress } = momentdata.saleConfig;

    const saleConfig: any = {
      ...momentdata.saleConfig,
      pricePerToken: pricePerToken.toString(),
      saleStart: Number(saleStart),
      saleEnd: Number(saleEnd),
      maxTokensPerAddress: Number(maxTokensPerAddress),
    };

    return NextResponse.json({
      uri: momentdata.tokenUri,
      owner: getAddress(momentdata.owner),
      saleConfig,
      momentAdmins: token.token_admins.map((admin) => admin.artist_address),
      metadata: {
        name: metadata.name || "",
        image: metadata.image || "",
        description: metadata.description || "",
        content: metadata.content || null,
        animation_url: metadata.animation_url || "",
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
