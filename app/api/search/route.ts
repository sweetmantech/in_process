import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/client";
import fetchTokenMetadata from "@/lib/fetchTokenMetadata";

// User type
interface User {
  address: string;
  username: string;
  bio: string | null;
}

// Moment type
interface Moment {
  tokenId: number;
  collection: string;
  name: string;
  image?: string;
}

// Search users by username (case-insensitive, partial)
async function searchUsersByName(searchKey: string): Promise<User | null> {
  const { data, error } = await supabase
    .from("in_process_artists")
    .select("address, username, bio")
    .ilike("username", `${searchKey}%`)
    .limit(1);
  if (error || !data || data.length === 0) return null;
  const row = data[0];
  return {
    address: row.address,
    username: row.username || "",
    bio: row.bio,
  };
}

// Search moments by title (fetch metadata and filter by name)
async function searchFirstMomentByTitle(
  searchKey: string
): Promise<Moment | null> {
  // Get recent tokens (limit to 50 for perf)
  const { data, error } = await supabase
    .from("in_process_tokens")
    .select("tokenId, address, uri")
    .order("createdAt", { ascending: false })
    .limit(50);
  if (error || !data) return null;
  for (const row of data) {
    if (!row.uri) continue;
    try {
      const metadata = await fetchTokenMetadata(
        row.address,
        String(row.tokenId)
      );
      if (
        metadata &&
        metadata.name &&
        metadata.name.toLowerCase().startsWith(searchKey.toLowerCase())
      ) {
        return {
          tokenId: row.tokenId,
          collection: row.address,
          name: metadata.name,
          image: metadata.image,
        };
      }
    } catch {}
  }
  return null;
}

export async function GET(req: NextRequest) {
  const searchKey = req.nextUrl.searchParams.get("searchKey") || "";
  if (!searchKey) {
    return Response.json({ type: null });
  }
  // Search users first
  const user = await searchUsersByName(searchKey);
  if (user) {
    return Response.json({ type: "user", user });
  }
  // If no user, search moments
  const moment = await searchFirstMomentByTitle(searchKey);
  if (moment) {
    return Response.json({ type: "moment", moment });
  }
  // If neither found
  return Response.json({ type: null });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
