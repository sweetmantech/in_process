import client from "@/lib/dune/client";

export async function GET() {
  try {
    const queryId = 4706176;
    const queryResult = await client.getLatestResult({
      queryId,
    });
    client.exec.executeQuery(queryId);
    return Response.json(queryResult.result?.rows || []);
  } catch (e: any) {
    console.log(e);
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
