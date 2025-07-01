import { NextRequest } from "next/server";
import { searchUserByName } from "@/lib/supabase/in_process_tokens/searchUserByName";

export async function GET(req: NextRequest) {
  const searchKey = req.nextUrl.searchParams.get("searchKey") || "";
  if (!searchKey) {
    return Response.json({ type: null });
  }
  const user = await searchUserByName(searchKey);
  if (user) {
    return Response.json({ user });
  }
  return Response.json({ user: null });
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
