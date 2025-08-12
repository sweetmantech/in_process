import { NextRequest } from "next/server";
import { getInProcessTokens } from "@/lib/supabase/in_process_tokens/getInProcessTokens";
import { getInProcessTokensCount } from "@/lib/supabase/in_process_tokens/getInProcessTokensCount";
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

  const {
    data,
    count: artistCount,
    error,
  } = await getInProcessTokens({
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
  const moments = (data || []).map((row) => ({
    ...row,
    tokenId: String(row.tokenId),
    admin: row.defaultAdmin,
  }));
  const { count } = await getInProcessTokensCount();
  const finalCount = artist ? artistCount || 0 : count || 0;
  return Response.json({
    status: "success",
    moments,
    pagination: {
      total_count: finalCount,
      page,
      limit,
      total_pages: finalCount ? Math.ceil(finalCount / limit) : 1,
    },
  });
}
