import deleteTag from "@/lib/stack/deleteTag";
import setTag from "@/lib/stack/setTag";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { walletAddress, username, bio, instagram, telegram, twitter } = body;
    await deleteTag(walletAddress, "profile");
    await setTag(walletAddress, "profile", {
      username,
      bio,
      socials: {
        instagram,
        telegram,
        twitter,
      },
    });
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
