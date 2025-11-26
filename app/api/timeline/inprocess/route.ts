import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import { mapMomentsToResponse } from "@/lib/moment/mapMomentsToResponse";
import { selectMoments } from "@/lib/supabase/in_process_moments/selectMoments";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
    const page = Number(searchParams.get("page") || 1);
    const chainId = Number(searchParams.get("chain_id") || CHAIN_ID);

    const hiddenParam = searchParams.get("hidden");
    const hidden = hiddenParam === null ? false : hiddenParam === "true";

    const offset = (page - 1) * limit;

    const { data: momentsData, count } = await selectMoments({
      chainId,
      offset,
      limit,
    });

    const processedMoments = await mapMomentsToResponse({
      moments: momentsData || [],
      hidden,
    });

    const totalPages = count ? Math.ceil(count / limit) : 0;

    return Response.json({
      status: "success",
      moments: processedMoments,
      pageInfo: {
        page,
        limit,
        total_pages: totalPages,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Failed to fetch inprocess timeline";
    return Response.json({ status: "error", message }, { status: 500 });
  }
}
