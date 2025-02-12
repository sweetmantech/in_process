import { QueryParameter } from "@duneanalytics/client-sdk";
import { NextRequest } from "next/server";
import client from "@/lib/dune/client";

export async function GET(req: NextRequest) {
  const artistAddress = req.nextUrl.searchParams.get("artistAddress");

  if (!artistAddress) {
    return Response.json(
      { message: "Artist address is required" },
      { status: 400 },
    );
  }

  const queryId = 4707397;
  const queryParameters = [QueryParameter.text("artistAddress", artistAddress)];

  try {
    let cachedResult;
    try {
      cachedResult = await client.getLatestResult({
        queryId,
        query_parameters: queryParameters,
      });
    } catch (cacheError) {
      console.error("Failed to fetch cached results:", cacheError);
    }
    if (cachedResult?.result?.rows) {
      client.exec
        .executeQuery(queryId, {
          query_parameters: queryParameters,
        })
        .catch((error) => console.error("Background refresh failed:", error));

      return Response.json(cachedResult.result.rows);
    }

    const freshResult = await client.runQuery({
      queryId,
      query_parameters: queryParameters,
    });
    return Response.json(freshResult.result?.rows || []);
  } catch (error) {
    console.error("Dune API error:", error);
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to get artist feed",
      },
      { status: 500 },
    );
  }
}
