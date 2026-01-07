import { NextRequest } from "next/server";
import getDetail from "@/lib/link/getDetail";
import { validateUrl } from "@/lib/url/validateUrl";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  try {
    if (!url) {
      return Response.json({ message: "URL parameter is required" }, { status: 400 });
    }

    // Validate URL to prevent fetching malicious content
    const validatedUrl = validateUrl(url);
    if (!validatedUrl) {
      return Response.json({ message: "Invalid or unsafe URL" }, { status: 400 });
    }

    const data = await getDetail(validatedUrl);
    return Response.json(data);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get link details";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
