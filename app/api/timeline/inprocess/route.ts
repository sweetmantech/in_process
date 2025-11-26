import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import selectMoments from "@/lib/supabase/in_process_moments/selectMoments";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit")) || 100, 100);
    const page = Number(searchParams.get("page")) || 1;
    const chain_id = Number(searchParams.get("chain_id")) || CHAIN_ID;

    const moments = await selectMoments({ chain_id, limit, page });

    return Response.json({
      moments,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get in-process timeline";
    return Response.json({ message }, { status: 500 });
  }
}
