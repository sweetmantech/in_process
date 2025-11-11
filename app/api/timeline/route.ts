import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import type { Database } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase/client";

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

  // I need supabase rpc function to get the data
  const { data, error } = await supabase.rpc("get_in_process_tokens", {
    p_artist: artist?.toLowerCase(),
    p_limit: limit,
    p_page: page,
    p_latest: latest,
    p_chainid: chainId,
    p_hidden: hidden,
  });
  if (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }

  // RPC function returns { moments, pagination }
  const response = data as {
    moments: any[];
    pagination: { page: number; limit: number; total_pages: number };
  };

  const moments = (response?.moments || []).map((row) => {
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
    pagination: response?.pagination || {
      page,
      limit,
      total_pages: 1,
    },
  });
}
