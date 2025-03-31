import getTag from "@/lib/stack/getTag";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  try {
    const walletAddress = req.nextUrl.searchParams.get("walletAddress");
    const tags: any = await getTag(walletAddress as Address, "profile");
    let profile = {
      username: "",
      bio: "",
    };
    if (tags?.tagData) {
      profile = {
        ...profile,
        ...tags?.tagData,
      };
    }
    return Response.json(profile);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to generate JWT";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
