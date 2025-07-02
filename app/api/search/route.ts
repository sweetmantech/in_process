import { NextRequest } from "next/server";
import { getArtists } from "@/lib/supabase/in_process_artists/getArtists";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  if (!query || query.trim().length === 0) {
    return Response.json(
      { artist: null, error: "Missing param: query" },
      { status: 400 }
    );
  }
  try {
    const artists = await getArtists(query, 1);
    if (artists?.length) {
      return Response.json({ artist: artists[0] });
    }
    return Response.json(
      { artist: null, error: "Artist not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error searching artists:", error);
    return Response.json(
      { artist: null, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
