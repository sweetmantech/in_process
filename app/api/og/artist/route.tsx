import { NextRequest } from "next/server";
import OgFooter from "@/components/Og/artist/OgFooter";
import OgHeader from "@/components/Og/artist/OgHeader";
import { Collection } from "@/types/token";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import getUsername from "@/lib/getUsername";
import getUserAvatar from "@/lib/getUserAvatar";

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
  const artistAddress: any = queryParams.get("artistAddress");

  const collections = await fetch(
    `${VERCEL_OG}/api/dune/artist/collections?artistAddress=${artistAddress}`,
  ).then((res) => res.json());
  const contractURIs = collections
    .slice(0, 4)
    .map((c: Collection) => c.contractURI);
  const metadataPromise = contractURIs.map(async (contractURI: string) => {
    return await fetch(getFetchableUrl(contractURI) || "").then((res) =>
      res.json(),
    );
  });
  const metadata = await Promise.all(metadataPromise);

  const { ImageResponse } = await import("@vercel/og");
  const username = await getUsername(artistAddress);
  const useravatar = await getUserAvatar(artistAddress);
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
          background: `url('${VERCEL_OG}/bg-gray.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <OgHeader avatar={useravatar} metadata={metadata} />
        <OgFooter username={username} />
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
