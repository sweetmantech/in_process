import getCreatedContractEvents from "@/lib/dune/getCreatedContractEvents";
import getFormattedCollections from "@/lib/dune/getFormattedCollections";
import getSmartWalletCreatedContractEvents from "@/lib/dune/getSmartWalletCreatedContractEvents";
import { DuneDecodedEvent } from "@/types/dune";

export async function GET() {
  try {
    const createdEvents: DuneDecodedEvent[] = await getCreatedContractEvents();
    const smartWalletCreatedEvents: DuneDecodedEvent[] =
      await getSmartWalletCreatedContractEvents();
    const formattedEvents = getFormattedCollections([
      ...createdEvents,
      ...smartWalletCreatedEvents,
    ]);
    return Response.json(formattedEvents);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
