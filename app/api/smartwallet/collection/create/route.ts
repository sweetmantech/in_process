import { CHAIN_ID } from "@/lib/consts";
import getSmartWallet from "@/lib/getSmartWallet";
import {
  sendUserOperation,
  waitForUserOperation,
} from "@coinbase/coinbase-sdk";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { parameters } = body;
  const { abi, functionName, address, args } = parameters;
  try {
    const smartWallet = await getSmartWallet();
    if (!smartWallet) throw new Error();
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
      paymasterUrl: process.env.PAYMASTER_URL,
    });
    const userOperationResult = await waitForUserOperation(userOperation);
    return Response.json(userOperationResult);
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to upload image";
    return Response.json({ message }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
