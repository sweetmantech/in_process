import getCrossmintCommentEvents from "@/lib/dune/getCrossmintCommentEvents";
import getFormattedMintComments from "@/lib/dune/getFormattedMintComments";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  const tokenId = req.nextUrl.searchParams.get("tokenId");
  const chainId = req.nextUrl.searchParams.get("chainId");

  try {
    const crossmintEvents: DuneDecodedEvent[] = await getCrossmintCommentEvents(
      tokenContract as string,
      chainId as string,
    );

    const comments = getFormattedMintComments(crossmintEvents);
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
