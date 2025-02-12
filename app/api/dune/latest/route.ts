import { getLatestFeed } from "@/lib/dune/getLatestFeed";

export async function GET() {
  try {
    const data = await getLatestFeed();
    return Response.json(data);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get Latest";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
