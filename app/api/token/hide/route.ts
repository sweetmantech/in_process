import deleteTag from "@/lib/stack/deleteTag";
import setTag from "@/lib/stack/setTag";
import { NextRequest } from "next/server";
import { Address, privateKeyToAccount } from "viem/accounts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tokens } = body;
    const owner = privateKeyToAccount(process.env.PRIVATE_KEY as Address);

    await deleteTag(owner.address, "timeline");
    await setTag(owner.address, "timeline", {
      hidden: JSON.stringify(tokens),
    });
    return Response.json({
      success: true,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create profile";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
