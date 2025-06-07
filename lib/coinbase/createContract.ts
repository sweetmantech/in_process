import {
  Address,
  encodeFunctionData,
  Hash,
  parseEventLogs,
  ParseEventLogsReturnType,
} from "viem";
import { z } from "zod";
import cdp from "@/lib/coinbase/client";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { createMomentSchema } from "@/lib/coinbase/createContractSchema";
import { create1155 } from "@/lib/zora/create1155";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema>;

export interface CreateContractResult {
  contractAddress: Address;
  hash: Hash;
  tokenId: string;
  chainId: number;
}

/**
 * Creates a new Zora 1155 contract using a smart account via Coinbase CDP.
 * Accepts the full API input shape for creating a Moment.
 */
export async function createContract({
  contract,
  token,
  account,
}: CreateMomentContractInput): Promise<CreateContractResult> {
  // Create a new EOA
  const evmAccount = await cdp.evm.createAccount();

  // Create a smart account (contract wallet)
  const smartAccount = await cdp.evm.createSmartAccount({ owner: evmAccount });

  // Use the protocol SDK to generate calldata
  const { parameters } = await create1155({ contract, token, account });

  // Encode the function call data
  const createContractData = encodeFunctionData({
    abi: parameters.abi,
    functionName: "createContract",
    args: parameters.args,
  });

  // Send the transaction and wait for receipt using the helper
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [
      {
        to: parameters.address,
        data: createContractData,
      },
    ],
  });

  const factoryLogs = parseEventLogs({
    abi: parameters.abi,
    logs: transaction.logs,
    eventName: "SetupNewContract",
  }) as ParseEventLogsReturnType;

  const collectionLogs = parseEventLogs({
    abi: zoraCreator1155ImplABI,
    logs: transaction.logs,
    eventName: "SetupNewToken",
  }) as ParseEventLogsReturnType;
  console.log("collectionLogs", collectionLogs);

  return {
    contractAddress: (factoryLogs[0].args as { newContract: Address })
      .newContract,
    tokenId: (collectionLogs[0].args as { tokenId: bigint }).tokenId.toString(),
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
