import OgBackground from "@/components/Og/token/OgBackground";
import OgFooter from "@/components/Og/token/OgFooter";
import OgHeader from "@/components/Og/token/OgHeader";
import getArtistInfo from "@/lib/getArtistInfo";
import { Address } from "viem";
import { NextRequest } from "next/server";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const VERCEL_OG = "https://in-process-seven.vercel.app";

const archivoFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Archivo-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const spectralFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Spectral-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

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
    `https://in-process-git-techengme-myc-1456-093c80-sweetmantechs-projects.vercel.app/api/token/metadata?collection=${collection}&tokenId=${tokenId}`,
  ).then((res) => res.json());

  console.log('ziad here', metadata)
  const artistInfo = await getArtistInfo(metadata.owner as Address);
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
            zIndex: 2,
            width: "100%",
            height: "100%",
            padding: 12,
          }}
        >
          <OgHeader
            ensAvatar={artistInfo.ensAvatar}
            ensName={artistInfo.ensName}
            comments={comments.length}
          />
          <OgFooter />
        </div>
      </div>
    ),
    {
      width: 500,
      height: 180,
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
