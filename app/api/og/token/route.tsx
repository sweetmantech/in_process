import OgBackground from "@/components/Og/token/OgBackground";
import OgFooter from "@/components/Og/token/OgFooter";
import OgHeader from "@/components/Og/token/OgHeader";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const VERCEL_OG = "https://in-process-seven.vercel.app";

const archivoFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Archivo-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

const spectralFont = fetch(
  new URL(`${VERCEL_OG}/fonts/Spectral-Regular.ttf`, import.meta.url),
).then((res) => res.arrayBuffer());

export async function GET() {
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
        <OgBackground backgroundUrl="https://arweave.net/v4oi_743N_ZlPiPbHyGyy9nhqyZsE_lLhzeHrmEHUG0" />
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
            ensAvatar="https://arweave.net/YvMzS0KHm7IFbZrb3C1pQzRaVvorLZR6eYJEpb3Vl7Q"
            comments={1}
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
