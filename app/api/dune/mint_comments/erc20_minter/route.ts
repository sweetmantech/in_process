import getErc20MintCommentsEvents from "@/lib/dune/getErc20MintCommentsEvents";
import getFormattedMintComments from "@/lib/dune/getFormattedMintComments";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  const tokenId = req.nextUrl.searchParams.get("tokenId");
  const chainId = req.nextUrl.searchParams.get("chainId");
  try {
    const erc20MinterEvents: DuneDecodedEvent[] =
      await getErc20MintCommentsEvents(
        tokenContract as string,
        chainId as string,
      );

    const comments = getFormattedMintComments(erc20MinterEvents);
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
