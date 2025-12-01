import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import getInProcessTimeline from "@/lib/supabase/in_process_moments/getInProcessTimeline";
import getArtistTimeline from "@/lib/supabase/in_process_moments/getArtistTimeline";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
  const page = Number(searchParams.get("page")) || 1;
  const artist = searchParams.get("artist") || undefined; // API doc uses "address" parameter
  const chainIdParam = searchParams.get("chain_id");
  const chainId = chainIdParam ? Number(chainIdParam) : CHAIN_ID;
  const hiddenParam = searchParams.get("hidden");
  const hidden = hiddenParam === null ? false : hiddenParam === "true";
  const type = searchParams.get("type") as "mutual" | "default" | undefined;

  // If artist/address is provided, handle artist timeline
  if (artist) {
    const { data, error } = await getArtistTimeline({
      artist,
      type: type || null, // Pass null when undefined to get both mutual + default
      limit,
      page,
      chainId,
      hidden,
    });

    if (error) {
      return Response.json({ status: "error", message: error.message }, { status: 500 });
    }

    if (!data) {
      return Response.json({ status: "error", message: "No data returned" }, { status: 500 });
    }

    return Response.json({
      status: "success",
      moments: data.moments,
      pagination: data.pagination,
    });
  }

  // In-process timeline (no artist/address parameter)
  const { data, error } = await getInProcessTimeline({
    limit,
    page,
    chainId,
    hidden,
  });

  if (error) {
    return Response.json({ status: "error", message: error.message }, { status: 500 });
  }

  if (!data) {
    return Response.json({ status: "error", message: "No data returned" }, { status: 500 });
  }

  return Response.json({
    status: "success",
    moments: data.moments,
    pagination: data.pagination,
  });
}
