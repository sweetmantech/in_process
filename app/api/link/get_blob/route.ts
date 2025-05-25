import { NextRequest } from "next/server";
import getBlob from "@/lib/getBlob";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  try {
    if (!url) throw Error("url is invalid.");
    const { blob, type } = await getBlob(url);
    return new Response(blob, {
      headers: {
        "Content-Type": type,
        "Content-Disposition": `attachment; filename="uploadedFile"`,
      },
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get blob";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
