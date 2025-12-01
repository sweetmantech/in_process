import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware } from "@/middleware/authMiddleware";
import selectCollections from "@/lib/supabase/in_process_collections/selectCollections";
import selectAdmins from "@/lib/supabase/in_process_admins/selectAdmins";
import upsertAdmins from "@/lib/supabase/in_process_admins/upsertAdmins";
import { momentSchema } from "@/lib/schema/momentSchema";

// CORS headers for allowing cross-origin requests
const corsHeaders = getCorsHeader();

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req, { corsHeaders });
    if (authResult instanceof Response) {
      return authResult;
    }
    const { artistAddress } = authResult;

    const body = await req.json();
    const parseResult = momentSchema.safeParse(body.moment);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json(
        { success: false, message: "Invalid input", errors: errorDetails },
        { status: 400, headers: corsHeaders }
      );
    }

    const moment = parseResult.data;

    const collections = await selectCollections({
      moments: [moment],
    });

    const collection = collections[0];
    if (!collection) {
      return Response.json(
        { success: false, message: "Collection not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const admins = await selectAdmins({
      moments: [
        {
          collectionId: collection.id,
          token_id: Number(moment.tokenId),
          artist_address: artistAddress.toLowerCase(),
        },
      ],
    });

    const admin = admins[0];
    if (!admin) {
      return Response.json(
        { success: false, message: "Admin not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const upserted = await upsertAdmins({
      admins: [
        {
          collection: collection.id,
          token_id: admin.token_id,
          hidden: !admin.hidden,
          artist_address: admin.artist_address,
          granted_at: admin.granted_at,
        },
      ],
    });

    return Response.json(
      {
        success: true,
        updated: upserted,
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to hide tokens";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
