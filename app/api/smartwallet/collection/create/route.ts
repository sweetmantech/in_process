import getSmartWallet from "@/lib/getSmartWallet";
import { NextRequest } from "next/server";
import { CHAIN_ID } from "@/lib/consts";
import { sendUserOperation } from "@coinbase/coinbase-sdk";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parameters = body.parameters;

  const { abi, address, functionName, args } = parameters
  try {
    const smartWallet = await getSmartWallet();
    if (!smartWallet) throw Error("failed get smart wallet.");

    const userOperation = await sendUserOperation(smartWallet, {
      calls: [
        {
          to: address,
          abi,
          functionName,
          args,
        },
      ],
      chainId: CHAIN_ID,
      paymasterUrl: process.env.PAYMASTER_URL
    });

    // const userOperationResult = await waitForUserOperation(userOperation);
    // console.log('ziad', userOperationResult)
    return Response.json({
      smartWalletAddress: smartWallet,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create collection.";
    return Response.json({ message }, { status: 500 });
  }
}
