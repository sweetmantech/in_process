import { NextRequest } from "next/server";
import { getArtists } from "@/lib/supabase/in_process_artists/getArtists";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query") || "";
  if (!query) {
    return Response.json({ artist: null });
  }
  const artists = await getArtists(query, 1);
  if (artists?.length) {
    return Response.json({ artist: artists[0] });
  }
  return Response.json({ artist: null });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
