export async function GET() {
  try {
    return Response.json({
      smartWalletAddress: process.env.COINBASE_CONFIGURATION,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create smart wallet.";
    return Response.json({ message }, { status: 500 });
  }
}
