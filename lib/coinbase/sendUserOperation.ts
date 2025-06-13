import { Hash, OneOf } from "viem";
import cdp from "@/lib/coinbase/client";
import { Call } from "@coinbase/coinbase-sdk/dist/types/calls";
import { CDP_PAYMASTER_URL } from "../consts";
import { getPublicClient } from "../viem/publicClient";

type EvmUserOperationNetwork = "base-sepolia" | "base";

export interface SendUserOperationParams {
  smartAccount: any;
  calls: readonly OneOf<Call<unknown, { [key: string]: unknown }>>[];
  network: EvmUserOperationNetwork;
}

export async function sendUserOperation({
  smartAccount,
  calls,
  network,
}: SendUserOperationParams) {
  // Send the transaction
  const sendResult = await cdp.evm.sendUserOperation({
    smartAccount,
    network,
    paymasterUrl: CDP_PAYMASTER_URL,
    calls,
  });

  // Wait for the transaction to be mined
  await cdp.evm.waitForUserOperation({
    smartAccountAddress: smartAccount.address,
    userOpHash: sendResult.userOpHash,
  });

  // Get the user operation
  const userOp = await cdp.evm.getUserOperation({
    smartAccount,
    userOpHash: sendResult.userOpHash,
  });

  // Wait for the transaction receipt
  const publicClient = getPublicClient(
    network === "base-sepolia" ? 84532 : 8453
  );
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: userOp.transactionHash as Hash,
  });

  return transaction;
}
