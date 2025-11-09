import {
  Address,
  encodeFunctionData,
  Hash,
  parseEventLogs,
  ParseEventLogsReturnType,
  getAddress,
} from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { createMomentSchema } from "@/lib/schema/createContractSchema";
import { create1155 } from "@/lib/zora/create1155";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { processSplits } from "@/lib/splits/processSplits";
import { resolveSplitAddresses } from "@/lib/splits/resolveSplitAddresses";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema>;

export interface CreateContractResult {
  contractAddress: Address;
  hash: Hash;
  tokenId: string;
  chainId: number;
}

/**
 * Creates a new In Process moment using a smart account via Coinbase CDP.
 * Accepts the full API input shape for creating a Moment.
 * Handles splits configuration by creating split contract if needed.
 */
export async function createMoment({
  contract,
  token,
  account,
  splits,
}: CreateMomentContractInput): Promise<CreateContractResult> {
  let payoutRecipient = token.payoutRecipient;
  let splitAddress: Address | null = null;
  const resolvedSplits = await resolveSplitAddresses(splits || []);

  if (resolvedSplits && resolvedSplits.length >= 2) {
    const result = await processSplits(resolvedSplits, account as Address);
    if (result.splitAddress) {
      splitAddress = result.splitAddress;
      payoutRecipient = getAddress(splitAddress) as typeof token.payoutRecipient;
    }
  }

  const tokenWithPayout = {
    ...token,
    ...(payoutRecipient && { payoutRecipient }),
  };
  // Create a smart account (contract wallet)
  const smartAccount = await getOrCreateSmartWallet({
    address: account as Address,
  });

  // Use the protocol SDK to generate calldata
  const { parameters } = await create1155({
    contract,
    token: tokenWithPayout,
    account,
    smartAccount: smartAccount.address,
    splits: resolvedSplits,
  });

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
    contractAddress: (factoryLogs[0].args as { newContract: Address }).newContract,
    tokenId: (collectionLogs[0].args as { tokenId: bigint }).tokenId.toString(),
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
