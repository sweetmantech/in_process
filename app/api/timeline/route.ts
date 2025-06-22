import { NextRequest } from "next/server";
import { getInProcessTokens } from "@/lib/supabase/in_process_tokens/getInProcessTokens";
import { CHAIN_ID } from "@/lib/consts";
import type { Database } from "@/lib/supabase/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
  const page = Number(searchParams.get("page")) || 1;
  const latest = searchParams.get("latest") !== "false"; // default true
  const artist = searchParams.get("artist") || undefined;
  const chainId = Number(searchParams.get("chainId")) || CHAIN_ID;
  const hiddenParam = searchParams.get("hidden");
  const hidden: Database["public"]["Tables"]["in_process_tokens"]["Row"]["hidden"] =
    hiddenParam === null ? false : hiddenParam === "true";

  const { data, count, error } = await getInProcessTokens({
    limit,
    page,
    latest,
    artist,
    chainId,
    hidden,
  });
  if (error) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 500 }
    );
  }

  const moments = (data || [])
    .map((row) => ({
      address: row.address,
      tokenId: String(row.tokenId),
      chainId: row.chainId,
      id: row.id,
      uri: row.uri,
      admin: row.defaultAdmin,
      createdAt: row.createdAt,
      username: row.username,
      hidden: row.hidden,
    }))
    .filter((moment) => artist || !!moment.username);

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
