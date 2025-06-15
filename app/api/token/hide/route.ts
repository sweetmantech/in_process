import { supabase } from "@/lib/supabase/client";
import { NextRequest } from "next/server";
import { getInProcessTokens } from "@/lib/supabase/in_process_tokens/getInProcessTokens";
import { Address } from "viem";
import { CHAIN_ID } from "@/lib/consts";

interface Token {
  tokenContract: Address;
  tokenId: string;
  owner: Address;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tokens } = body as { tokens: Token[] };

    // 1. Lookup the rows using getYoutubeTokens with both addresses and tokenIds
    const { data: rows, error: fetchError } = await getInProcessTokens({
      addresses: tokens.map((t) => t.tokenContract),
      tokenIds: tokens.map((t) => t.tokenId),
      chainId: CHAIN_ID,
      limit: 1000,
    });
    if (fetchError) throw fetchError;
    if (!rows) throw new Error("No tokens found");

    // 2. Extract ids
    const ids = rows.map((row) => row.id);

    if (ids.length === 0) {
      return Response.json(
        { success: false, message: "No matching tokens found" },
        { status: 404 }
      );
    }

    // 3. Batch update by id
    const { error: updateError } = await supabase
      .from("in_process_tokens")
      .update({ hidden: true })
      .in("id", ids);

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
