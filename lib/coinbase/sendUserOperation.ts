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
  // Debug logging for paymaster URL
  console.log("CDP_PAYMASTER_URL:", CDP_PAYMASTER_URL);
  console.log("Network:", network);
  console.log("Smart account address:", smartAccount.address);
  
  if (!CDP_PAYMASTER_URL || CDP_PAYMASTER_URL.includes("undefined")) {
    throw new Error("CDP_PAYMASTER_KEY environment variable is not set. Please set CDP_PAYMASTER_KEY in your environment variables.");
  }

  let sendResult;
  try {
    // Send the transaction
    sendResult = await cdp.evm.sendUserOperation({
      smartAccount,
      network,
      paymasterUrl: CDP_PAYMASTER_URL,
      calls,
    });
  } catch (error: any) {
    console.error("Error in sendUserOperation:", error);
    
    // Check if it's a paymaster related error
    if (error.message && error.message.includes("insufficient balance")) {
      throw new Error(
        `Insufficient balance error detected. This likely means the CDP paymaster is not working correctly. ` +
        `Check that CDP_PAYMASTER_KEY is set correctly. Current paymaster URL: ${CDP_PAYMASTER_URL}. ` +
        `Original error: ${error.message}`
      );
    }
    
    throw error;
  }

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
