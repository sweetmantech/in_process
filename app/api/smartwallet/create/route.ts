import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createSmartWallet } from "@coinbase/coinbase-sdk";
import { Coinbase } from "@coinbase/coinbase-sdk";

Coinbase.configure(JSON.parse(process.env.COINBASE_CONFIGURATION as string));

export async function GET() {
  try {
    const privateKey = generatePrivateKey();
    const owner = privateKeyToAccount(privateKey);
    const wallet = await createSmartWallet({
      signer: owner,
    });
    return Response.json({
      smartWalletAddress: wallet.address,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create smart wallet.";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
