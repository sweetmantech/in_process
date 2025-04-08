import { BLOCKLISTS, IS_TESTNET } from "@/lib/consts";
import getArtistCreatedContractEvents from "@/lib/dune/getArtistCreatedContractEvents";
import getArtistSmartWalletCreatedEvents from "@/lib/dune/getArtistSmartWalletCreatedEvents";
import getFormattedCollections from "@/lib/dune/getFormattedCollections";
import getNextTokenIds from "@/lib/viem/getNextTokenIds";
import { getTokens } from "@/lib/viem/getTokens";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const artistAddress = req.nextUrl.searchParams.get("artistAddress");
  try {
    const createdEvents: DuneDecodedEvent[] =
      await getArtistCreatedContractEvents(artistAddress as string);
    const smartWalletEvents: DuneDecodedEvent[] =
      await getArtistSmartWalletCreatedEvents();
    const collections = getFormattedCollections([
      ...createdEvents,
      ...smartWalletEvents,
    ]);
    const collectionsWithTokenIds = await getNextTokenIds(collections);
    const eventsWithLatestUris = await getTokens(collectionsWithTokenIds);
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
