import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import selectCollections from "@/lib/supabase/in_process_collections/selectCollections";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
  const page = Number(searchParams.get("page")) || 1;
  const artist = searchParams.get("artist") || undefined;
  const chainIdParam = searchParams.get("chain_id");
  const chainId = chainIdParam ? Number(chainIdParam) : CHAIN_ID;

  try {
    const result = await selectCollections({
      artists: artist ? [artist.toLowerCase()] : undefined,
      limit,
      page,
      chainId,
    });

    if (result.error) {
      return Response.json(
        {
          status: "error",
          message: "Failed to fetch collections",
          error: result.error.message,
        },
        { status: 500 }
      );
    }

    return Response.json({
      status: "success",
      collections: result.data,
      pagination: {
        page,
        limit,
        total_pages: Math.ceil((result.count || 0) / limit),
      },
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: "An error occurred while fetching collections",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
