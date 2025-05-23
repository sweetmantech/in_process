import { NextRequest } from "next/server";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import {
  OG_HEIGHT,
  OG_WIDTH,
  rotation,
  VERCEL_OG,
  WRITING_MAX_LINES,
  WRITING_SHORT_LINES,
} from "@/lib/og/consts";
import { imageMeta } from "image-meta";
import fetchTokenMetadata from "@/lib/fetchTokenMetadata";

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

  const metadata = await fetchTokenMetadata(
    collection as string,
    tokenId as string,
  );
  if (!metadata) throw Error("failed to get token metadata");

  const previewBackgroundUrl = getFetchableUrl(metadata.image);
  const isWriting = metadata.content.mime === "text/plain";

  let orientation = 1;
  let originalWidth = 1;
  let originalHeight = 0;
  let paddingLeft = 0;
  let totalLines = 0;
  let writingText = "";

  if (isWriting) {
    const response = await fetch(getFetchableUrl(metadata.content.uri) || "");
    const data = await response.text();
    writingText = data;
    const paragraphs = writingText.split("\n");
    paragraphs.map(
      (paragraph) =>
        (totalLines =
          totalLines + parseInt(Number(paragraph.length / 64).toFixed()) + 1),
    );
  } else if (previewBackgroundUrl) {
    const response = await fetch(previewBackgroundUrl);
    if (!response.ok) throw Error("failed to get image metadata");
    const data = await response.arrayBuffer();
    const uint8Array = new Uint8Array(data);
    const meta = imageMeta(uint8Array);
    orientation = meta.orientation || 1;
    originalWidth = meta.width || 0;
    originalHeight = meta.height || 1;
    paddingLeft =
      (Math.abs((OG_WIDTH / originalHeight) * originalWidth - OG_WIDTH) / 2) *
      -1;
  }

  const { ImageResponse } = await import("@vercel/og");
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);
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
          backgroundColor: "#E0DDD8",
        }}
      >
        {isWriting ? (
          <div
            style={{
              display: "flex",
              paddingTop: 32,
              paddingLeft: 32,
              paddingRight: 32,
              paddingBottom: totalLines > WRITING_MAX_LINES ? 0 : 32,
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems:
                  totalLines > WRITING_MAX_LINES ? "flex-start" : "center",
                justifyContent: totalLines > 1 ? "flex-start" : "center",
              }}
            >
              <pre
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                  fontFamily: "Spectral",
                  fontSize: totalLines <= WRITING_SHORT_LINES ? 32 : 16,
                }}
              >
                {writingText}
              </pre>
            </div>
            {totalLines > WRITING_MAX_LINES && (
              <div
                style={{
                  position: "absolute",
                  left: 32,
                  bottom: 0,
                  width: "100%",
                  height: "50%",
                  backgroundImage:
                    "linear-gradient(180deg, rgba(224, 221, 216, 0) 0%, rgba(224, 221, 216, 1) 100%)",
                }}
              />
            )}
          </div>
        ) : (
          // eslint-disable-next-line
          <img
            src={previewBackgroundUrl as string}
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
        )}
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
