import { NextRequest } from "next/server";
import mux from "@/lib/mux";
import { v4 as uuidv4 } from "uuid";
import { authMiddleware } from "@/middleware/authMiddleware";
import getCorsHeader from "@/lib/getCorsHeader";

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

    const id = uuidv4();
    const upload = await mux.video.uploads.create({
      cors_origin: "*",

      new_asset_settings: {
        passthrough: id,
        playback_policy: ["public"],
        video_quality: "basic",
        static_renditions: [{ resolution: "highest" }],
        master_access: "temporary",
      },
    });

    return Response.json(
      {
        uploadURL: upload.url,
        uploadId: upload.id,
      },
      { headers: corsHeaders }
    );
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create upload intent";
    return Response.json({ message }, { status: 500, headers: corsHeaders });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
