import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const uri = req.nextUrl.searchParams.get("uri");
    if (!uri) {
      return Response.json({ message: "No URI provided" }, { status: 400 });
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    try {
      const response = await fetch(getFetchableUrl(uri as string) || "", {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const data = await response.json();
      return Response.json(data);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error && err.name === "AbortError") {
        return Response.json({
          image: "",
          name: "",
          description: "",
          external_url: "",
        });
      }
      throw err;
    }
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to generate JWT";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
