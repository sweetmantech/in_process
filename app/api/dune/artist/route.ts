import { BLOCKLISTS, IS_TESTNET } from "@/lib/consts";
import getArtistCreatedContractEvents from "@/lib/dune/getArtistCreatedContractEvents";
import { getUris } from "@/lib/viem/getUris";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const artistAddress = req.nextUrl.searchParams.get("artistAddress");
  try {
    const createdEvents: DuneDecodedEvent[] = await getArtistCreatedContractEvents(
      artistAddress as string,
    );

    const formattedEvents = transactions.map(
      (transaction: DuneDecodedEvent) => {
        const setUpEvent = transaction.logs.find(
          (log) => log?.decoded?.name === "SetupNewContract",
        );
        if (!setUpEvent) return;
        const data: any = {
          chainId: transaction.chain_id,
          chain: transaction.chain,
        };
        setUpEvent?.decoded?.inputs.forEach((input) => {
          data[`${input.name}`] = input.value;
        });
        data.released_at = new Date(transaction.block_time).getTime();
        return data;
      },
    );
    const eventsWithLatestUris = await getUris(formattedEvents);
    return Response.json(
      eventsWithLatestUris.filter(
        (feed) => IS_TESTNET || !BLOCKLISTS.includes(feed.defaultAdmin),
      ),
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
