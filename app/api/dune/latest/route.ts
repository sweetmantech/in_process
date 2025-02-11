import client from "@/lib/dune/client";

export async function GET() {
  try {
    const queryResult = await client.runQuery({
      queryId: 4707812,
    });
    return Response.json(queryResult.result?.rows || []);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Latest";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
