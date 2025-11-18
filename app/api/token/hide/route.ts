import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware } from "@/middleware/authMiddleware";
import { type TimelineMoment } from "@/lib/timeline/fetchTimeline";
import { getTokenAdmin } from "@/lib/supabase/in_process_token_admins/getTokenAdmin";
import { updateTokenAdmin } from "@/lib/supabase/in_process_token_admins/updateTokenAdmin";

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
    const { moment } = body as { moment: TimelineMoment };

    const { data: tokenAdmin, error: fetchError } = await getTokenAdmin({
      token: moment.id,
      artistAddress: artistAddress.toLowerCase(),
    });
    if (fetchError) throw fetchError;
    if (!tokenAdmin) {
      return Response.json(
        { success: false, message: "No matching token admin found" },
        { status: 404, headers: corsHeaders }
      );
    }

    const { data: updatedRows, error: updateError } = await updateTokenAdmin({
      token: moment.id,
      artistAddress: artistAddress.toLowerCase(),
      update: { hidden: !(tokenAdmin.hidden ?? false) },
    });

    if (updateError) throw updateError;

    return Response.json(
      {
        success: true,
        updated: updatedRows,
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
