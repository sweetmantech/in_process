import getSmartWallet from "@/lib/getSmartWallet";
import { NextRequest } from "next/server";
import { CHAIN, CHAIN_ID } from "@/lib/consts";
import {
  sendUserOperation,
  waitForUserOperation,
} from "@coinbase/coinbase-sdk";
import { Address, privateKeyToAccount } from "viem/accounts";
import { publicClient } from "@/lib/viem/publicClient";
import { createWalletClient, http } from "viem";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parameters = body.parameters;
  const { abi, address, functionName, args } = parameters;

  try {
    const smartWallet = await getSmartWallet();
    if (!smartWallet) throw Error("failed get smart wallet.");

    const gas = await publicClient.estimateContractGas({
      address,
      abi,
      functionName,
      args,
    });
    const adminWallet = process.env.PRIVATE_KEY as Address;
    const admin = privateKeyToAccount(process.env.PRIVATE_KEY as Address);
    const walletClient = createWalletClient({
      account: admin,
      transport: http(CHAIN.rpcUrls.default.http[0]),
    });
    const hash = await walletClient.sendTransaction({
      chain: CHAIN,
      to: smartWallet.address,
      value: gas,
    });
    await publicClient.waitForTransactionReceipt({ hash });

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
    return Response.json({
      ...userOperationResult,
      adminWallet,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create collection.";
    return Response.json({ message }, { status: 500 });
  }
}
