import { Address, encodeFunctionData, Hash, parseEventLogs } from "viem";
import { z } from "zod";
import { zoraCreator1155FactoryImplABI as abi } from "@zoralabs/protocol-deployments";
import { publicClient } from "@/lib/viem/publicClient";
import cdp from "@/lib/coinbase/client";
import { CDP_PAYMASTER_URL } from "@/lib/consts";
import { createMomentSchema } from "@/lib/coinbase/createContractSchema";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema>;

export interface CreateContractResult {
  contractAddress: Address;
  hash: Hash;
}

/**
 * Creates a new Zora 1155 contract using a smart account via Coinbase CDP.
 * Accepts the full API input shape for creating a Moment.
 */
export async function createContract({
  contract,
  account,
}: CreateMomentContractInput): Promise<CreateContractResult> {
  // Create a new EOA
  const evmAccount = await cdp.evm.createAccount();

  // Create a smart account (contract wallet)
  const smartAccount = await cdp.evm.createSmartAccount({ owner: evmAccount });

  // Royalty configuration (0% for now, can be extended)
  const royaltyConfig = {
    royaltyMintSchedule: 0,
    royaltyBPS: 500,
    royaltyRecipient: smartAccount.address,
  };

  // Encode the function call data
  const createContractData = encodeFunctionData({
    abi,
    functionName: "createContract",
    args: [
      contract.uri, // contractUri
      contract.name, // collectionName
      royaltyConfig,
      account as Address, // defaultAdmin
      [], // setupActions
    ],
  });

  // Send the transaction
  const sendResult = await cdp.evm.sendUserOperation({
    smartAccount,
    network: "base-sepolia",
    paymasterUrl: CDP_PAYMASTER_URL,
    calls: [
      {
        to: "0x6832A997D8616707C7b68721D6E9332E77da7F6C" as Address, // Contract factory address
        data: createContractData,
      },
    ],
  });

  // Wait for the transaction to be mined
  await cdp.evm.waitForUserOperation({
    smartAccountAddress: smartAccount.address,
    userOpHash: sendResult.userOpHash,
  });

  // Get the transaction details
  const userOp = await cdp.evm.getUserOperation({
    smartAccount,
    userOpHash: sendResult.userOpHash,
  });
  const transaction = await publicClient.waitForTransactionReceipt({
    hash: userOp.transactionHash as Hash,
  });
  const topics = parseEventLogs({
    abi,
    logs: transaction.logs,
    eventName: "SetupNewContract",
  });

  return {
    contractAddress: topics[0].args.newContract,
    hash: userOp.transactionHash as Hash,
  };
}
