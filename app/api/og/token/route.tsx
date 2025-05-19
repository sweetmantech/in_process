import { NextRequest } from "next/server";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { OG_HEIGHT, OG_WIDTH, rotation, VERCEL_OG } from "@/lib/og/consts";
import { imageMeta } from "image-meta";

export const dynamic = "force-dynamic";
export const runtime = "edge";

const archivoFont = fetch(`${VERCEL_OG}/fonts/Archivo-Regular.ttf`).then(
  (res) => res.arrayBuffer(),
);

const spectralFont = fetch(`${VERCEL_OG}/fonts/Spectral-Regular.ttf`).then(
  (res) => res.arrayBuffer(),
);

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const collection: any = queryParams.get("collection");
  const tokenId: any = queryParams.get("tokenId");

  if (!tokenId || !collection)
    throw Error("collection or tokenId should be provided.");

  const metadata = await fetch(
    `${VERCEL_OG}/api/token/metadata?collection=${collection}&tokenId=${tokenId}`,
  ).then((res) => res.json());

  const { ImageResponse } = await import("@vercel/og");
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);

  let orientation = 1;
  let originalWidth = 0;
  let originalHeight = 0;
  if (metadata.metadata.image) {
    const imageUrl = getFetchableUrl(metadata.metadata.image) || "";
    const response = await fetch(imageUrl);
    if (response.ok) {
      const data = await response.arrayBuffer();
      const uint8Array = new Uint8Array(data);
      const meta = imageMeta(uint8Array);
      orientation = meta.orientation || 1;
      originalWidth = meta.width || 0;
      originalHeight = meta.height || 0;
    }
  }
  const previewBackgroundUrl =
    getFetchableUrl(
      metadata.metadata.image || `${VERCEL_OG}/images/placeholder.png`,
    ) || "";
  const paddingLeft =
    (Math.abs((OG_WIDTH / originalHeight) * originalWidth - OG_WIDTH) / 2) * -1;
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          // overflow: "hidden",
          width: "100%",
          height: "100%",
          position: "relative",
          alignItems: "center",
        }}
      >
        {/* eslint-disable-next-line */}
        <img
          src={previewBackgroundUrl}
          style={{
            width:
              orientation === 6 || orientation === 8
                ? (OG_WIDTH / originalHeight) * originalWidth
                : "100%",
            transform: rotation[orientation],
            left: orientation === 6 || orientation === 8 ? paddingLeft : 0,
            position: "absolute",
          }}
        />
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: "Archivo",
          data: archivoFontData,
          weight: 400,
        },
        {
          name: "Spectral",
          data: spectralFontData,
          weight: 400,
        },
      ],
    },
  );
}
