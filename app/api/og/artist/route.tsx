import { NextRequest } from "next/server";
import getUsername from "@/lib/getUsername";
import { OG_HEIGHT, OG_WIDTH, VERCEL_OG } from "@/lib/og/consts";
import { Address } from "viem";
import getImageMetadata from "@/lib/getImageMetadata";
import ArtistInfo from "@/components/Og/artist/ArtistInfo";
import TokenImagePreview from "@/components/Og/artist/TokenImagePreview";
import TokenWritingPreview from "@/components/Og/artist/TokenWritingPreview";
import NoMoments from "@/components/Og/artist/NoMoments";
import getArtistLatestMoment from "@/lib/getArtistLatestMoment";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

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

  const metadata = await getArtistLatestMoment(
    artistAddress as string,
    chainIdNum,
  );
  const username = await getUsername(artistAddress as Address);

  const { ImageResponse } = await import("@vercel/og");
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);

  let writingText = "";
  let totalLines = 0;
  let imageMetadata = null;

  if (metadata) {
    if (metadata.content.mime === "text/plain") {
      const response = await fetch(getFetchableUrl(metadata.content.uri) || "");
      const data = await response.text();
      writingText = data;
      const paragraphs = writingText.split("\n");
      paragraphs.map(
        (paragraph) =>
          (totalLines =
            totalLines + parseInt(Number(paragraph.length / 32).toFixed()) + 1),
      );
    } else {
      imageMetadata = await getImageMetadata(
        getFetchableUrl(metadata.image) || "",
      );
    }
  }

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
            justifyContent: "center",
            backgroundColor: "#E0DDD8",
            overflow: "hidden",
            borderRadius: 18,
          }}
        >
          {metadata ? (
            <>
              {metadata.content.mime === "text/plain" ? (
                <TokenWritingPreview
                  writingText={writingText}
                  totalLines={totalLines}
                />
              ) : (
                <TokenImagePreview imageMetadata={imageMetadata} />
              )}
            </>
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
