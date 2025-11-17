import mux from "@/lib/mux";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const uploadId = searchParams.get("uploadId");

  if (!uploadId) {
    return Response.json({ message: "uploadId is required" }, { status: 400 });
  }

  try {
    const upload = await mux.video.uploads.retrieve(uploadId);

    if (!upload.asset_id) {
      return Response.json({
        status: "processing",
        message: "Upload complete, asset is being created",
      });
    }

    const asset = await mux.video.assets.retrieve(upload.asset_id);

    const playbackUrl = asset.playback_ids?.[0]
      ? `https://stream.mux.com/${asset.playback_ids[0].id}.m3u8`
      : null;

    return Response.json({
      playbackUrl,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get upload info";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
