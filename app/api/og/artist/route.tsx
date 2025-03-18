import { NextRequest } from "next/server";
import OgFooter from "@/components/Og/artist/OgFooter";
import OgHeader from "@/components/Og/artist/OgHeader";
import getArtistInfo from "@/lib/getArtistInfo";
import { Collection } from "@/types/token";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export const VERCEL_OG = "https://in-process-seven.vercel.app";

const archivoFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Archivo-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const spectralFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Spectral-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const artistAddress: any = queryParams.get("artistAddress");

  const tokens = await fetch(
    `${VERCEL_OG}/api/dune/latest?artistAddress=${artistAddress}`,
  ).then((res) => res.json());
  const contractURIs = tokens
    .slice(0, 4)
    .map((token: Collection) => token.contractURI);
  const metadataPromise = contractURIs.map(async (contractURI: string) => {
    return await fetch(getFetchableUrl(contractURI) || "").then((res) =>
      res.json(),
    );
  });
  const metadata = await Promise.all(metadataPromise);

  const { ImageResponse } = await import("@vercel/og");
  const artistInfo = await getArtistInfo(artistAddress);
  const [archivoFontData, spectralFontData] = await Promise.all([
    archivoFont,
    spectralFont,
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          background:
            "url('https://arweave.net/gy-nRfHfMpRN7mFefZ8CO3UH0GdO_Pn2ff5LRhw7VTU')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <OgHeader ensAvatar={artistInfo.ensAvatar} metadata={metadata} />
        <OgFooter ensName={artistInfo.ensName} />
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
