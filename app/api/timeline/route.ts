import { NextRequest } from "next/server";
import { getYoutubeTokens } from "@/lib/supabase/youtube_tokens/getYoutubeTokens";
import { CHAIN_ID } from "@/lib/consts";
import getArtistProfile from "@/lib/getArtistProfile";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
  const page = Number(searchParams.get("page")) || 1;
  const latest = searchParams.get("latest") !== "false"; // default true
  const artist = searchParams.get("artist") || undefined;
  const chainId = Number(searchParams.get("chainId")) || CHAIN_ID;

  const { data, count, error } = await getYoutubeTokens({
    limit,
    page,
    latest,
    artist,
    chainId,
  });
  if (error) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }

  const profiles = await Promise.all(
    (data || []).map((row) => getArtistProfile(row.defaultAdmin as Address))
  );

  const moments = (data || [])
    .map((row, i) => ({
      address: row.address,
      tokenId: String(row.tokenId),
      chainId: row.chainId,
      id: row.id,
      uri: row.uri,
      admin: row.defaultAdmin,
      createdAt: row.createdAt,
      username: profiles[i]?.username || "",
    }))
    .filter((moment) => !!moment.username);

  return Response.json({
    status: "success",
    moments,
    pagination: {
      total_count: count || 0,
      page,
      limit,
      total_pages: count ? Math.ceil(count / limit) : 1,
    },
  });
}
