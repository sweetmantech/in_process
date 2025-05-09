import getFormattedMintComments from "@/lib/dune/getFormattedMintComments";
import getWrapperCommentsEvents from "@/lib/dune/getWrapperCommentsEvents";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  const tokenId = req.nextUrl.searchParams.get("tokenId");
  const chainId = req.nextUrl.searchParams.get("chainId");
  try {
    const wrapperEvents: DuneDecodedEvent[] = await getWrapperCommentsEvents(
      tokenContract as string,
      chainId as string,
    );

    const comments = getFormattedMintComments(wrapperEvents);
    return Response.json(
      tokenId ? comments.filter((e) => e.tokenId === tokenId) : comments,
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
