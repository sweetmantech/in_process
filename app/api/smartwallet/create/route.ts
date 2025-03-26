import getSmartWallet from "@/lib/getSmartWallet";

export async function GET() {
  try {
    const smartWallet = await getSmartWallet();
    return Response.json({
      smartWalletAddress: smartWallet?.address,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create smart wallet.";
    return Response.json({ message }, { status: 500 });
  }
}
