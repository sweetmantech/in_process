import { NextRequest } from "next/server";
import OgFooter from "@/components/Og/artist/OgFooter";
import OgHeader from "@/components/Og/artist/OgHeader";
import getArtistInfo from "@/lib/getArtistInfo";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const archivoFont = fetch(
  new URL(
    "https://inprocess.myco.wtf/fonts/Archivo-Regular.ttf",
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

const spectralFont = fetch(
  new URL(
    "https://inprocess.myco.wtf/fonts/Spectral-Regular.ttf",
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const queryParams = req.nextUrl.searchParams;
  const artistAddress: any = queryParams.get("artistAddress");

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
        <OgHeader ensAvatar={artistInfo.ensAvatar} />
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
