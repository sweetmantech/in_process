import getTag from "@/lib/stack/getTag";
import { NextRequest } from "next/server";
import { Address } from "viem";
import getEnsName from "@/lib/viem/getEnsName";
import getZoraProfile from "@/lib/zora/getZoraProfile";

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
    } else {
      const zora = await getZoraProfile(walletAddress as Address);
      if (zora) {
        profile = {
          ...profile,
          username: zora.displayName,
          bio: zora.description,
        };
      } else {
        const ensName = await getEnsName(walletAddress as Address);
        if (ensName)
          profile = {
            ...profile,
            username: ensName,
          };
      }
    }
    return Response.json(profile);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get profile.";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
