import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import getInProcessTimeline from "@/lib/supabase/in_process_moments/getInProcessTimeline";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
  const page = Number(searchParams.get("page")) || 1;
  const latest = searchParams.get("latest") !== "false"; // default true
  const artist = searchParams.get("address") || undefined; // API doc uses "address" parameter
  const chainIdParam = searchParams.get("chain_id") || searchParams.get("chainId"); // Support both formats
  const chainId = chainIdParam ? Number(chainIdParam) : CHAIN_ID;
  const hiddenParam = searchParams.get("hidden");
  const hidden = hiddenParam === null ? false : hiddenParam === "true";
  const type = searchParams.get("type") as "mutual" | "default" | undefined;

  // If artist/address is provided, this is an artist timeline (not implemented yet)
  if (artist) {
    // TODO: Implement artist timeline RPC functions
    return Response.json(
      {
        status: "error",
        message: "Artist timeline not yet implemented",
      },
      { status: 501 }
    );
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
