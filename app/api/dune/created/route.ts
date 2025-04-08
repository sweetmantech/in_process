import { BLOCKLISTS, IS_TESTNET } from "@/lib/consts";
import getCreatedContractEvents from "@/lib/dune/getCreatedContractEvents";
import getFormattedCollections from "@/lib/dune/getFormattedCollections";
import getSmartWalletCreatedContractEvents from "@/lib/dune/getSmartWalletCreatedContractEvents";
import { getUris } from "@/lib/viem/getUris";
import { DuneDecodedEvent } from "@/types/dune";
import { Collection } from "@/types/token";
import getCreatedTokenEvents from "@/lib/dune/getCreatedTokenEvents";

export async function GET() {
  try {
    const createdEvents: DuneDecodedEvent[] = await getCreatedContractEvents();
    const smartWalletCreatedEvents: DuneDecodedEvent[] =
      await getSmartWalletCreatedContractEvents();
    const collections = getFormattedCollections([...createdEvents, ...smartWalletCreatedEvents])
    const promise = collections.map(async (collection: Collection) => {
      const createdEvents = await getCreatedTokenEvents(collection.newContract)
      const formattedEvents = createdEvents.map((transaction: DuneDecodedEvent) => {
        const setUpEvent = transaction.logs.find(
          (log) => log?.decoded?.name === "SetupNewToken",
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
      return formattedEvents
    })
    const data = await Promise.all(promise)
    // const eventsWithLatestUris = await getUris(collections);
    return Response.json(
      data,
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
