import { CHAIN_ID } from "@/lib/consts";
import getCreatedContractEvents from "@/lib/dune/getCreatedContractEvents";
import getFormattedCollections from "@/lib/dune/getFormattedCollections";
import getSmartWallet from "@/lib/getSmartWallet";
import { FACTORY_ADDRESSES } from "@/lib/protocolSdk/create/factory-addresses";
import { DuneDecodedEvent } from "@/types/dune";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const offsets:
    | {
        factory?: string | undefined;
        smartWallet?: string | undefined;
      }
    | undefined = body?.offsets;
  const artistAddress = req.nextUrl.searchParams.get("artistAddress");

  const nextOffsets: {
    factory?: string;
    smartWallet?: string;
  } = {};

  try {
    const events: DuneDecodedEvent[][] = [];
    if (!offsets || offsets.factory) {
      const { transactions: factoryEvents, nextOffset: factoryNextOffset } =
        await getCreatedContractEvents(
          (artistAddress as Address) || FACTORY_ADDRESSES[CHAIN_ID],
          offsets?.factory,
          artistAddress ? { to: FACTORY_ADDRESSES[CHAIN_ID] } : undefined,
        );
      events.push(factoryEvents);
      if (factoryNextOffset) nextOffsets.factory = factoryNextOffset;
    }
    const smartWallet = await getSmartWallet();
    if (smartWallet && (!offsets || offsets.smartWallet)) {
      const {
        transactions: smartWalletEvents,
        nextOffset: smartWalletNextOffset,
      } = await getCreatedContractEvents(
        smartWallet.address,
        offsets?.smartWallet,
      );
      events.push(smartWalletEvents);
      if (smartWalletNextOffset)
        nextOffsets.smartWallet = smartWalletNextOffset;
    }

    const formattedEvents = getFormattedCollections(events.flat());
    return Response.json({
      collections: Boolean(artistAddress)
        ? formattedEvents.filter(
            (e) =>
              e.defaultAdmin.toLowerCase() === artistAddress?.toLowerCase(),
          )
        : formattedEvents,
      nextOffsets,
      artistAddress,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get collections";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
