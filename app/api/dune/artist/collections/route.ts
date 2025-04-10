import getArtistCreatedContractEvents from "@/lib/dune/getArtistCreatedContractEvents";
import getArtistSmartWalletCreatedEvents from "@/lib/dune/getArtistSmartWalletCreatedEvents";
import getFormattedCollections from "@/lib/dune/getFormattedCollections";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const artistAddress = req.nextUrl.searchParams.get("artistAddress");
  try {
    const createdEvents: DuneDecodedEvent[] =
      await getArtistCreatedContractEvents(artistAddress as string);
    const smartWalletEvents: DuneDecodedEvent[] =
      await getArtistSmartWalletCreatedEvents();
    const formattedEvents = getFormattedCollections([
      ...createdEvents,
      ...smartWalletEvents,
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
