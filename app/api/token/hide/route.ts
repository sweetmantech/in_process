import { NextRequest } from "next/server";
import { getInProcessTokens } from "@/lib/supabase/in_process_tokens/getInProcessTokens";
import { updateInProcessTokens } from "@/lib/supabase/in_process_tokens/updateInProcessTokens";
import { CHAIN_ID } from "@/lib/consts";
import { Moment } from "@/components/HorizontalFeed/HideButton";
import { Address } from "viem";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { moment } = body as { moment: Moment };

    const { data: rows, error: fetchError } = await getInProcessTokens({
      addresses: [moment.tokenContract.toLowerCase() as Address],
      tokenIds: [Number(moment.tokenId)],
      chainId: CHAIN_ID,
    });
    if (fetchError) throw fetchError;
    if (!rows) throw new Error("No tokens found");

    const ids = rows.map((row) => row.id);

    if (ids.length === 0) {
      return Response.json(
        { success: false, message: "No matching tokens found" },
        { status: 404 }
      );
    }

    const { error: updateError } = await updateInProcessTokens({
      ids,
      update: { hidden: !rows[0].hidden },
    });

    if (updateError) throw updateError;

    return Response.json({
      success: true,
      updated: ids.length,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to hide tokens";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
