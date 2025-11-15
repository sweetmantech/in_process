import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import type { Database } from "@/lib/supabase/types";
import { getInProcessTokens } from "@/lib/supabase/in_process_tokens/getInProcessTokens";

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
    artist,
    limit,
    page,
    latest,
    chainId,
    hidden,
  });

  if (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json({ status: "error", message: "No data returned" }, { status: 500 });
  }

  const totalCount = count || 0;
  const totalPages = totalCount > 0 ? Math.ceil(totalCount / limit) : 1;

  const moments = data.map((row) => {
    const { defaultAdmin, ...rest } = row;
    return {
      ...rest,
      tokenId: String(row.tokenId),
      admin: defaultAdmin,
    };
  });

  return Response.json({
    status: "success",
    moments,
    pagination: {
      page,
      limit,
      total_pages: totalPages,
    },
  });
}
