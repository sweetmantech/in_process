import mux from "@/lib/mux";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const id = uuidv4();
  try {
    // Create a new upload using the Mux SDK.
    const upload = await mux.video.uploads.create({
      // Set the CORS origin to your application.
      cors_origin: "*",

      // Specify the settings used to create the new Asset after
      // the upload is complete
      new_asset_settings: {
        passthrough: id,
        playback_policy: ["public"],
        video_quality: "basic",
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
