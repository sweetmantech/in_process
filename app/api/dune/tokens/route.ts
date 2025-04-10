import getNextTokenIds, { CollectionAndNextTokenId } from "@/lib/viem/getNextTokenIds";
import { Collection } from "@/types/token";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const collections: Collection[] = body.collections

  try {
    const collectionsAndNextTokenIds = await getNextTokenIds(collections)
    collectionsAndNextTokenIds.map(async (c: CollectionAndNextTokenId) => {
        const tokens = [{
            tokenId: 1,
            collection: c.newContract,
            creator: c.creator,

        }]
        if (c.nextTokenId < 2) {
            return [{
                tokenId: 1,
                nextTokenId:
            }]
        }
    })
    return Response.json([]);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
