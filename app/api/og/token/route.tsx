import OgBackground from "@/components/Og/token/OgBackground";
import OgFooter from "@/components/Og/token/OgFooter";
import OgHeader from "@/components/Og/token/OgHeader";
import { NextRequest, NextResponse } from "next/server";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import getUsername from "@/lib/getUsername";
import getUserAvatar from "@/lib/getUserAvatar";
import { VERCEL_OG } from "@/lib/og/consts";
import satori from "satori";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const archivoFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Archivo-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const spectralFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Spectral-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const WIDTH = 500;
const HEIGHT = 333;

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
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);
  const svg = await satori(
    <div
      style={{
        display: "flex",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OgBackground
        backgroundUrl={
          getFetchableUrl(
            metadata.metadata.image || `${VERCEL_OG}/images/placeholder.png`,
          ) || ""
        }
      />
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
    </div>,
    {
      width: WIDTH,
      height: HEIGHT,
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
    } as any,
  );

  return new NextResponse(svg, {
    headers: {
      "content-type": "image/svg+xml",
    },
  });
}
