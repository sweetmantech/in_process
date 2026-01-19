import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import selectCollections from "@/lib/supabase/in_process_collections/selectCollections";
import selectAdmins from "@/lib/supabase/in_process_admins/selectAdmins";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const collectionAddress = searchParams.get("collectionAddress")?.toLowerCase() || undefined;
  const chainIdParam = searchParams.get("chainId");
  const chainId = chainIdParam ? Number(chainIdParam) : CHAIN_ID;

  if (!collectionAddress) {
    return Response.json(
      { status: "error", message: "collectionAddress parameter is required" },
      { status: 400 }
    );
  }

  try {
    const { data: collections, error: collectionError } = await selectCollections({
      collectionAddress,
      chainId,
    });

    if (collectionError) {
      return Response.json({ status: "error", message: collectionError.message }, { status: 500 });
    }

    const collection = collections?.[0] ?? null;
    if (!collection) {
      return Response.json({ status: "error", message: "Collection not found" }, { status: 404 });
    }

    const metadata = await fetchTokenMetadata(collection.uri);

    const admins = await selectAdmins({
      moments: [
        {
          collectionId: collection.id,
          token_id: 0,
        },
      ],
    });

    const uniqueAdmins = Array.from(new Set(admins.map((admin) => admin.artist_address))).sort(
      (b, a) => b.localeCompare(a)
    );

    const response = {
      ...collection,
      metadata,
      admins: uniqueAdmins,
    };

    return Response.json(response);
  } catch (error) {
    return Response.json(
      {
        status: "error",
        message: "An error occurred while fetching collection",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
