import { NextRequest } from "next/server";
import { QueryParameter } from "@duneanalytics/client-sdk";
import client from "@/lib/dune/client";

export async function GET(req: NextRequest) {
  try {
    const artistAddress = req.nextUrl.searchParams.get("artistAddress");
    const queryId = 4707397;
    const query_parameters: QueryParameter[] = [
      QueryParameter.text("TextField", artistAddress as string),
    ];
    const executionResult = await client.runQuery({
      queryId,
      query_parameters,
    });
    return Response.json(executionResult.result?.rows);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Latest";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
