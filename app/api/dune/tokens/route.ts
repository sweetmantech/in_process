import getCreatedTokenEvents from "@/lib/dune/getCreatedTokenEvents";
import getFormattedTokens from "@/lib/dune/getFormattedTokens";
import getNextTokenIds, {
  CollectionAndNextTokenId,
} from "@/lib/viem/getNextTokenIds";
import { getTokenUrisSales } from "@/lib/viem/getTokenUrisSales";
import { DuneDecodedEvent } from "@/types/dune";
import { Collection } from "@/types/token";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const collections: Collection[] = body.collections;

  try {
    const collectionsAndNextTokenIds = await getNextTokenIds(collections);
    const promise = collectionsAndNextTokenIds.map(
      async (c: CollectionAndNextTokenId) => {
        const tokens = [
          {
            tokenId: 1,
            collection: c.newContract,
            creator: c.defaultAdmin,
            chain: c.chain,
            chainId: c.chainId,
            released_at: c.released_at,
            uri: "",
          },
        ];
        if (c.nextTokenId < 2) return tokens;
        const events: DuneDecodedEvent[] = await getCreatedTokenEvents(
          c.newContract,
        );
        const formattedEvents = getFormattedTokens(events);
        const newCreatedTokens = formattedEvents.map((e) => ({
          collection: c.newContract,
          tokenId: e.tokenId,
          creator: e.sender,
          chain: c.chain,
          chainId: c.chainId,
          released_at: e.released_at,
          uri: "",
        }));
        return [...tokens, ...newCreatedTokens];
      },
    );
    const tokens = await Promise.all(promise);
    const sortedTokens = tokens
      .flat()
      .sort(
        (a, b) =>
          new Date(b.released_at).getTime() - new Date(a.released_at).getTime(),
      );
    const tokensAndUris = await getTokenUrisSales(sortedTokens);
    return Response.json(tokensAndUris);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
