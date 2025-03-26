import getSmartWallet from "@/lib/getSmartWallet";

export async function GET() {
  try {
    const smartWallet = await getSmartWallet();
    if (!smartWallet) throw new Error();
    return Response.json({
      smartWalletAddress: smartWallet.address,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to generate JWT";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
