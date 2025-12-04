import { NextRequest, NextResponse } from "next/server";
import { fetchTokenMetadata } from "@/lib/protocolSdk/ipfs/token-metadata";
import selectAdmins from "@/lib/supabase/in_process_admins/selectAdmins";
import { getMomentAdvancedInfo } from "@/lib/moment/getMomentAdvancedInfo";
import selectCollections from "@/lib/supabase/in_process_collections/selectCollections";
import { momentSchema } from "@/lib/schema/momentSchema";
import { Database } from "@/lib/supabase/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = {
      collectionAddress: searchParams.get("collectionAddress"),
      tokenId: searchParams.get("tokenId"),
      chainId: searchParams.get("chainId"),
    };

    const parseResult = momentSchema.safeParse(queryParams);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return NextResponse.json(
        { error: "Invalid query parameters", errors: errorDetails },
        { status: 400 }
      );
    }

    const moment = parseResult.data;

    const { data: collections } = await selectCollections({
      moments: [moment],
    });

    const collection = collections?.[0] ?? null;

    const { uri, owner, saleConfig } = await getMomentAdvancedInfo(moment);
    const metadata = await fetchTokenMetadata(uri || "");

    let admins: Database["public"]["Tables"]["in_process_admins"]["Row"][] = [];
    if (collection) {
      admins = await selectAdmins({
        moments: [
          {
            collectionId: collection.id,
            token_id: Number(moment.tokenId),
          },
        ],
      });
    }

    return NextResponse.json({
      uri,
      owner,
      saleConfig,
      momentAdmins: collection ? admins.map((admin) => admin.artist_address) : [owner],
      metadata: {
        name: metadata.name || "",
        image: metadata.image || "",
        description: metadata.description || "",
        content: metadata.content || null,
        animation_url: metadata.animation_url || "",
      },
    });
  } catch (error: any) {
    console.error("Error fetching moment info:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch moment info" },
      { status: 500 }
    );
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
