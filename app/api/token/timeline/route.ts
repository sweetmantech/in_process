import getTag from "@/lib/stack/getTag";
import { Address, privateKeyToAccount } from "viem/accounts";

export async function GET() {
  try {
    const owner = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
    const tags = await getTag(owner.address, "timeline");
    console.log("tags", tags);
    return Response.json(tags);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create profile";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
