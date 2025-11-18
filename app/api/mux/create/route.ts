import mux from "@/lib/mux";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const id = uuidv4();
  try {
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

    return Response.json({
      uploadURL: upload.url,
      uploadId: upload.id,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create upload intent";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
