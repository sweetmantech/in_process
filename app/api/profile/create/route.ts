import { upsertArtist } from "@/lib/supabase/in_process_artists/upsertArtist";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, username, bio, instagram, telegram, twitter } = body;
    
    const result = await upsertArtist({
      address: walletAddress.toLowerCase(),
      username,
      bio,
      instagram_username: instagram,
      telegram_username: telegram,
      twitter_username: twitter,
    });
    if (result.error) {
      throw new Error(result.error.message);
    }
    return Response.json({
      success: true,
    });

  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create profile";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
