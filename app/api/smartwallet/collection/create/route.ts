import { Coinbase, waitForUserOperation } from "@coinbase/coinbase-sdk";
import getSmartWallet from "@/lib/getSmartWallet";
import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";

Coinbase.configure(JSON.parse(process.env.COINBASE_CONFIGURATION as string));

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parameters = body.parameters;

  const { abi, address, functionName, args } = parameters
  try {
    const smartWallet = await getSmartWallet();
    if (!smartWallet) throw Error("failed get smart wallet.");

    console.log('ziad', smartWallet.address)
    const userOperation = await smartWallet.sendUserOperation({
      calls: [
        {
          to: address,
          abi: abi,
          functionName,
          args,
        },
      ],
      chainId: CHAIN_ID,
    });

    const userOperationResult = await waitForUserOperation(userOperation);
    console.log('ziad', userOperationResult)
    return Response.json({
      smartWalletAddress: smartWallet?.address,
      parameters,
      userOperationResult
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create smart wallet.";
    return Response.json({ message }, { status: 500 });
  }
}
