import { Address, privateKeyToAccount } from "viem/accounts";
import { createSmartWallet } from "@coinbase/coinbase-sdk";
import { Coinbase } from "@coinbase/coinbase-sdk";
import getSmartWallet from "@/lib/getSmartWallet";

Coinbase.configure(JSON.parse(process.env.COINBASE_CONFIGURATION as string));

export async function GET() {
  try {
    const owner = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
    const smartWallet = await getSmartWallet(owner.address);
    if (smartWallet)
      return Response.json({
        smartWalletAddress: smartWallet.accounts[0].baseContractAddress,
      });
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
