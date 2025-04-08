import { BLOCKLISTS, IS_TESTNET } from "@/lib/consts";
import getCreatedContractEvents from "@/lib/dune/getCreatedContractEvents";
import getFormattedCollections from "@/lib/dune/getFormattedCollections";
import getSmartWalletCreatedContractEvents from "@/lib/dune/getSmartWalletCreatedContractEvents";
import { getTokens } from "@/lib/viem/getTokens";
import { DuneDecodedEvent } from "@/types/dune";
import getNextTokenIds from "@/lib/viem/getNextTokenIds";

export async function GET() {
  try {
    const createdEvents: DuneDecodedEvent[] = await getCreatedContractEvents();
    const smartWalletCreatedEvents: DuneDecodedEvent[] =
      await getSmartWalletCreatedContractEvents();
    const collections = getFormattedCollections([
      ...createdEvents,
      ...smartWalletCreatedEvents,
    ]);
    const collectionsWithTokenIds = await getNextTokenIds(collections);
    const tokens = await getTokens(collectionsWithTokenIds);
    return Response.json(
      tokens.filter((c) => !BLOCKLISTS.includes(c.creator) || IS_TESTNET),
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
