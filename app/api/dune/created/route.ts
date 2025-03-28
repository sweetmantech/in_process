import { BLOCKLISTS, IS_TESTNET } from "@/lib/consts";
import getCreatedContractEvents from "@/lib/dune/getCreatedContractEvents";
import getSmartWalletCreatedContractEvents from "@/lib/dune/getSmartWalletCreatedContractEvents";
import { getUris } from "@/lib/viem/getUris";
import { DuneDecodedEvent } from "@/types/dune";

export async function GET() {
  try {
    const createdEvents: DuneDecodedEvent[] = await getCreatedContractEvents();
    const smartWalletCreatedEvents: DuneDecodedEvent[] =
      await getSmartWalletCreatedContractEvents();
    const formattedEvents = [...createdEvents, ...smartWalletCreatedEvents]
      .sort(
        (a: DuneDecodedEvent, b: DuneDecodedEvent) =>
          new Date(b.block_time).getTime() - new Date(a.block_time).getTime(),
      )
      .map((transaction: DuneDecodedEvent) => {
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
      });
    const eventsWithLatestUris = await getUris(formattedEvents);
    return Response.json(
      eventsWithLatestUris.filter(
        (feed) => IS_TESTNET || !BLOCKLISTS.includes(feed.creator),
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
