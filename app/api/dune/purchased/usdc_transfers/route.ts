import getFormattedTransfers from "@/lib/dune/getFormattedTransfers";
import getWrapperTransferEvents from "@/lib/dune/getWrapperTransferEvents";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  const owner = req.nextUrl.searchParams.get("owner");
  const tokenContract = req.nextUrl.searchParams.get("tokenContract");
  const wrapper = req.nextUrl.searchParams.get("wrapper");

  try {
    const transactions: DuneDecodedEvent[] = await getWrapperTransferEvents(
      wrapper as Address,
      tokenContract as Address,
      owner as Address,
    );
    const transfers = getFormattedTransfers(transactions);
    return Response.json(transfers);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
