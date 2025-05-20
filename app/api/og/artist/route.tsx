import { NextRequest } from "next/server";
import { Metadata } from "@/types/token";
import getUsername from "@/lib/getUsername";
import { OG_HEIGHT, OG_WIDTH, rotation, VERCEL_OG } from "@/lib/og/consts";
import fetchTokenMetadata from "@/lib/fetchTokenMetadata";
import { Address } from "viem";
import getArtistLatestMint from "@/lib/fetchArtistLatestMint";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { imageMeta } from "image-meta";

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

  let metadata: Metadata | null = null;
  const latestMintedToken = await getArtistLatestMint(
    artistAddress as string,
    chainIdNum,
  );
  if (latestMintedToken)
    metadata = await fetchTokenMetadata(
      latestMintedToken.tokenContract,
      BigInt(latestMintedToken.tokenId).toString(),
    );
  const username = await getUsername(artistAddress as Address);

  const { ImageResponse } = await import("@vercel/og");
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);
  const previewBackgroundUrl = metadata?.image
    ? getFetchableUrl(metadata.image || ``)
    : null;

  let orientation = 1;
  let originalWidth = 1;
  let originalHeight = 0;
  if (previewBackgroundUrl) {
    const response = await fetch(previewBackgroundUrl);
    if (response.ok) {
      const data = await response.arrayBuffer();
      const uint8Array = new Uint8Array(data);
      const meta = imageMeta(uint8Array);
      orientation = meta.orientation || 1;
      originalWidth = meta.width || 0;
      originalHeight = meta.height || 1;
    }
  }
  const paddingLeft =
    (Math.abs((OG_WIDTH / originalHeight) * originalWidth - OG_WIDTH) / 2) * -1;

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
        <div
          style={{
            display: "flex",
            width: "30%",
            flexDirection: "column",
          }}
        >
          {/* eslint-disable-next-line */}
          <img
            src="https://arweave.net/GlRVqkN9sLPSmN09CSLTAgc5lW-GaUg23I0-wRd2MwI"
            width="100%"
          />
          <p
            style={{
              fontFamily: "Archivo",
              fontSize: 18,
            }}
          >
            {username}
          </p>
        </div>
        {/* eslint-disable-next-line */}
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
          {previewBackgroundUrl ? (
            // eslint-disable-next-line
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
          ) : (
            <div
              style={{
                fontFamily: "Archivo",
                fontSize: 32,
                textAlign: "center",
                color: "#605F5C",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              No Preview.
            </div>
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
