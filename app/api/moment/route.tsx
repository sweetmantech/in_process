import { NextRequest } from "next/server";
import { Address } from "viem";
import getTokenInfo from "@/lib/viem/getTokenInfo";
import { selectTokens } from "@/lib/supabase/in_process_tokens/selectTokens";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import { TokenMetadataJson } from "@/lib/protocolSdk/ipfs/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tokenContract = searchParams.get("tokenContract");
    const tokenId = searchParams.get("tokenId");
    const chainId = searchParams.get("chainId");

    if (!tokenContract || !tokenId || !chainId) {
      return Response.json({ message: "Invalid input" }, { status: 400 });
    }

    const tokenInfo = await getTokenInfo(
      tokenContract as Address,
      tokenId as string,
      Number(chainId)
    );

    let metadata: TokenMetadataJson = {
      name: "",
      image: "",
      description: "",
      content: {
        mime: "",
        uri: "",
      },
      attributes: [],
    };
    try {
      metadata = await fetchTokenMetadata(tokenInfo.tokenUri);
    } catch (e: any) {
      console.error(e, tokenInfo.tokenUri);
    }

    const { data: tokens = [], error: selectTokensError } = await selectTokens({
      tokenContract: tokenContract as Address,
      chainId: Number(chainId),
    });
    if (selectTokensError) {
      return Response.json({ message: selectTokensError.message }, { status: 500 });
    }

    return Response.json(
      {
        ...tokenInfo,
        tokenAdmins:
          tokens.length > 0
            ? tokens[0]?.token_admins.map((admin: any) => admin.artist_address)
            : [],
        metadata,
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get moment info";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
