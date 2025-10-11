import { getOrCreateAccount } from "@/lib/coinbase/getOrCreateAccount";
import { NextRequest } from "next/server";
import { Address } from "viem";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address") as Address;
  try {
    const smartAccount = await getOrCreateAccount({
      address,
    });
    return Response.json({
      address: smartAccount.address,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create collection";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
