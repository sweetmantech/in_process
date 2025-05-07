import OgBackground from "@/components/Og/token/OgBackground";
import OgFooter from "@/components/Og/token/OgFooter";
import OgHeader from "@/components/Og/token/OgHeader";
import OgWritingToken from "@/components/Og/token/OgWritingToken";
import { NextRequest } from "next/server";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import getUsername from "@/lib/getUsername";
import getUserAvatar from "@/lib/getUserAvatar";
import { OG_HEIGHT, OG_WIDTH, VERCEL_OG } from "@/lib/og/consts";
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

  const comments = await fetch(
    `${VERCEL_OG}/api/dune/mint_comments?tokenContract=${collection}&tokenId=${tokenId}`,
  ).then((res) => res.json());

  const metadata = await fetch(
    `${VERCEL_OG}/api/token/metadata?collection=${collection}&tokenId=${tokenId}`,
  ).then((res) => res.json());

  const username = await getUsername(metadata.owner);
  const useravatar = await getUserAvatar(metadata.owner);
  const { ImageResponse } = await import("@vercel/og");
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);

  const isWritingToken = metadata.metadata?.writing !== undefined;
  
  let orientation = 1;
  if (metadata.metadata.image) {
    const imageUrl = getFetchableUrl(metadata.metadata.image) || "";
    const response = await fetch(imageUrl);
    if (response.ok) {
      const data = await response.arrayBuffer();
      const uint8Array = new Uint8Array(data);
      const meta = imageMeta(uint8Array);
      orientation = meta.orientation || 1;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: isWritingToken ? "flex-start" : "center",
        }}
      >
        {isWritingToken ? ( <OgWritingToken text={metadata.metadata.writing} />
        ) : (
          <OgBackground
            backgroundUrl={
              getFetchableUrl(
                metadata.metadata.image || `${VERCEL_OG}/images/placeholder.png`,
              ) || ""
            }
            orientation={orientation}
          />
        )}

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: 12,
          }}
        >
          <OgHeader
            ensAvatar={useravatar}
            username={username}
            comments={comments.length}
          />
          <OgFooter />
        </div>
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