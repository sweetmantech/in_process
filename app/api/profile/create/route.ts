import { deleteArtist } from "@/lib/supabase/in_process_artists/deleteArtist";
import { insertArtist } from "@/lib/supabase/in_process_artists/insertArtist";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, username, bio, instagram, telegram, twitter } = body;
    const { data: deletedData, error: deletedError } = await deleteArtist(walletAddress);
    if (deletedError) {
      throw new Error(deletedError.message);
    }
    const { data: insertedData, error: insertedError } = await insertArtist({
      address: walletAddress,
      username,
      bio,
      instagram_username: instagram,
      telegram_username: telegram,
      twitter_username: twitter,
    });
    if (insertedError) {
      throw new Error(insertedError.message);
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
