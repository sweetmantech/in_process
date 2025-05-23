import { NextRequest } from "next/server";
import getUsername from "@/lib/getUsername";
import { OG_HEIGHT, OG_WIDTH, VERCEL_OG } from "@/lib/og/consts";
import { Address } from "viem";
import getArtistLatestMint from "@/lib/fetchArtistLatestMint";
import getImageMetadata from "@/lib/getImageMetadata";
import ArtistInfo from "@/components/Og/artist/ArtistInfo";
import TokenPreview from "@/components/Og/artist/TokenPreview";
import NoMoments from "@/components/Og/artist/NoMoments";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const archivoFont = fetch(`${VERCEL_OG}/fonts/Archivo-Regular.ttf`).then(
  (res) => res.arrayBuffer(),
);

const spectralFont = fetch(`${VERCEL_OG}/fonts/Spectral-Regular.ttf`).then(
  (res) => res.arrayBuffer(),
);

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const artistAddress = queryParams.get("artistAddress");
  const chainId = queryParams.get("chainId");
  const chainIdNum = parseInt(chainId as string, 10);

  const metadata = await getArtistLatestMint(
    artistAddress as string,
    chainIdNum,
  );
  const username = await getUsername(artistAddress as Address);

  const { ImageResponse } = await import("@vercel/og");
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);

  const imageMetadata = await getImageMetadata(metadata?.image);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          paddingTop: 48,
          paddingBottom: 48,
          paddingLeft: 32,
          paddingRight: 32,
          display: "flex",
          justifyContent: "space-between",
          background: `url('${VERCEL_OG}/bg-gray.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <ArtistInfo nickName={username} />
        <div
          style={{
            display: "flex",
            width: "65%",
            height: "100%",
            position: "relative",
            alignItems: "center",
            backgroundColor: "#E0DDD8",
            overflow: "hidden",
            borderRadius: 18,
          }}
        >
          {metadata ? (
            <TokenPreview imageMetadata={imageMetadata} />
          ) : (
            <NoMoments />
          )}
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
