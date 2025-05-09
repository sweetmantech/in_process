import { CHAIN_ID } from "@/lib/consts";
import getCrossmintCommentEvents from "@/lib/dune/getCrossmintCommentEvents";
import getErc20MintCommentsEvents from "@/lib/dune/getErc20MintCommentsEvents";
import getSmartWalletMintCommentEvents from "@/lib/dune/getSmartWalletMintCommentEvents";
import getTokenContractMintCommentEvents from "@/lib/dune/getTokenContractMintCommentEvents";
import getWrapperCommentsEvents from "@/lib/dune/getWrapperCommentsEvents";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  const tokenId = req.nextUrl.searchParams.get("tokenId");
  const chainIdParam = req.nextUrl.searchParams.get("chainId");
  const chainId = chainIdParam || CHAIN_ID;

  try {
    const erc20MinterEvents: DuneDecodedEvent[] =
      await getErc20MintCommentsEvents(
        tokenContract as string,
        chainId as string,
      );
    const tokenContractEvents: DuneDecodedEvent[] =
      await getTokenContractMintCommentEvents(
        tokenContract as string,
        chainId as string,
      );
    const smartWalletEvents: DuneDecodedEvent[] =
      await getSmartWalletMintCommentEvents(
        tokenContract as string,
        chainId as string,
      );
    const crossmintEvents: DuneDecodedEvent[] = await getCrossmintCommentEvents(
      tokenContract as string,
      chainId as string,
    );
    const wrapperEvents: DuneDecodedEvent[] = await getWrapperCommentsEvents(
      tokenContract as string,
      chainId as string,
    );
    const formattedEvents = [
      ...erc20MinterEvents,
      ...tokenContractEvents,
      ...smartWalletEvents,
      ...crossmintEvents,
      ...wrapperEvents,
    ].map((transaction: DuneDecodedEvent) => {
      const mintCommentEvent = transaction.logs.find(
        (log) => log?.decoded?.name === "MintComment",
      );
      if (!mintCommentEvent) return;
      const data: any = {
        chainId: transaction.chain_id,
        chain: transaction.chain,
      };
      mintCommentEvent?.decoded?.inputs.forEach((input) => {
        data[`${input.name}`] = input.value;
      });
      data.timestamp = new Date(transaction.block_time).getTime();
      data.blockNumber = transaction.block_number;
      data.transactionHash = transaction.hash;
      return data;
    });
    return Response.json(
      tokenId
        ? formattedEvents.filter((e) => e.tokenId === tokenId)
        : formattedEvents,
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
