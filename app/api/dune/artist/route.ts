import client from "@/lib/dune/client";
import { QueryParameter } from "@duneanalytics/client-sdk";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const artistAddress = req.nextUrl.searchParams.get("artistAddress");
    const queryResult = await client.runQuery({
      queryId: 4707397,
      query_parameters: [
        QueryParameter.text("artistAddress", artistAddress as string),
      ],
    });
    return Response.json(queryResult.result?.rows || []);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get artist feed";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
