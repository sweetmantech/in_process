import { NextRequest } from "next/server";
import getDetail from "@/lib/link/getDetail";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  try {
    if (!url) throw Error("url is invalid.");

    const data = await getDetail(url);
    return Response.json(data);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Dune transactions";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
