import { NextRequest } from "next/server";
import { Address } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export async function GET(req: NextRequest) {
  try {
    const walletAddress = req.nextUrl.searchParams.get("walletAddress");
    const publicClient = getPublicClient(mainnet.id);
    const ensName = await publicClient.getEnsName({
      address: walletAddress as Address,
    });
    const ensAvatar = await publicClient.getEnsAvatar({
      name: normalize(ensName as string),
    });
    return Response.json(ensAvatar);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get ens avatar.";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
