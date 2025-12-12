import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import selectCollections from "@/lib/supabase/in_process_collections/selectCollections";
import { createCollectionSchema } from "@/lib/schema/createCollectionSchema";
import { createCollection } from "@/lib/collection/createCollection";
import getCorsHeader from "@/lib/getCorsHeader";

const corsHeaders = getCorsHeader();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
  const page = Number(searchParams.get("page")) || 1;
  const artist = searchParams.get("artist") || undefined;
  const chainIdParam = searchParams.get("chain_id");
  const chainId = chainIdParam ? Number(chainIdParam) : CHAIN_ID;

  try {
    const {
      data: collections,
      count: collectionsCount,
      error: collectionsError,
    } = await selectCollections({
      artists: artist ? [artist.toLowerCase()] : undefined,
      limit,
      page,
      chainId,
    });

    if (collectionsError) {
      return Response.json({ status: "error", message: collectionsError.message }, { status: 500 });
    }

    return Response.json({
      status: "success",
      collections,
      pagination: {
        page,
        limit,
        total_pages: Math.ceil((collectionsCount || 0) / limit),
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

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = createCollectionSchema.safeParse(body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json(
        { message: "Invalid input", errors: errorDetails },
        { status: 400, headers: corsHeaders }
      );
    }
    const data = parseResult.data;
    const result = await createCollection(data);
    return Response.json(result, { headers: corsHeaders });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "Failed to create collection";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
