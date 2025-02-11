import { getIpfsLink } from "@/lib/utils";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const uri = req.nextUrl.searchParams.get("uri");
    const response = await fetch(getIpfsLink(uri as string));
    const data = await response.json();
    return Response.json(data);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to generate JWT";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
