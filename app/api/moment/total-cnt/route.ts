import { getInProcessMomentsTotalCnt } from "@/lib/supabase/in_process_moments/getInProcessMomentsTotalCnt";

export async function GET() {
  try {
    const { count, error } = await getInProcessMomentsTotalCnt();
    if (error) throw error;
    return Response.json({ total: count });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to get total counts.";
    return Response.json({ message }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
