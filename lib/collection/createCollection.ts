import {
  Address,
  encodeFunctionData,
  Hash,
  parseEventLogs,
  ParseEventLogsReturnType,
  getAddress,
} from "viem";
import { z } from "zod";
import { CHAIN_ID, IS_TESTNET, ROYALTY_BPS_DEFAULT } from "@/lib/consts";
import { createCollectionSchema } from "@/lib/schema/createCollectionSchema";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { zoraCreator1155FactoryImplABI } from "@zoralabs/protocol-deployments";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { getFactoryAddress } from "@/lib/protocolSdk/create/factory-addresses";
import { getAdminPermissionSetupActions } from "@/lib/zora/getAdminPermissionSetupActions";
import { makeContractParameters } from "@/lib/protocolSdk/utils";
import { processSplits } from "@/lib/splits/processSplits";
import { resolveSplitAddresses } from "@/lib/splits/resolveSplitAddresses";
import { getSplitAdminAddresses } from "@/lib/splits/getSplitAdminAddresses";

export type CreateCollectionInput = z.infer<typeof createCollectionSchema>;

export interface CreateCollectionResult {
  contractAddress: Address;
  hash: Hash;
  chainId: number;
}

/**
 * Creates a new collection (contract) on-chain without creating any tokens.
 * Uses the Zora 1155 factory to create a new contract with the specified parameters.
 */
export async function createCollection(
  input: CreateCollectionInput
): Promise<CreateCollectionResult> {
  const smartAccount = await getOrCreateSmartWallet({
    address: input.account as Address,
  });

  const accountAddress = input.account;
  const resolvedSplits = await resolveSplitAddresses(input.splits || []);

  let royaltyRecipient = accountAddress;
  if (resolvedSplits && resolvedSplits.length >= 2) {
    const result = await processSplits(resolvedSplits, smartAccount);
    if (result.splitAddress) {
      royaltyRecipient = getAddress(result.splitAddress) as Address;
    }
  }

  // Get split addresses for admin permissions
  const { addresses: splitAddresses, smartWallets: splitSmartWallets } =
    await getSplitAdminAddresses(resolvedSplits);

  // Generate admin permission setup actions
  const additionalSetupActions = getAdminPermissionSetupActions([
    smartAccount.address,
    ...splitAddresses,
    ...splitSmartWallets,
  ]);

  const parameters = makeContractParameters({
    abi: zoraCreator1155FactoryImplABI,
    functionName: "createContractDeterministic",
    account: smartAccount.address,
    address: getFactoryAddress(CHAIN_ID),
    args: [
      input.uri,
      input.name,
      {
        royaltyMintSchedule: 0,
        royaltyBPS: ROYALTY_BPS_DEFAULT,
        royaltyRecipient,
      },
      accountAddress,
      additionalSetupActions,
    ],
  });

  // Encode the function call data
  const functionCallData = encodeFunctionData({
    abi: parameters.abi,
    functionName: "createContractDeterministic",
    args: parameters.args,
  });

  // Send the transaction and wait for receipt
  const transaction = await sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    calls: [
      {
        to: parameters.address,
        data: functionCallData,
      },
    ],
  });

  // Parse contract creation event
  const factoryLogs = parseEventLogs({
    abi: zoraCreator1155FactoryImplABI,
    logs: transaction.logs,
    eventName: "SetupNewContract",
  }) as ParseEventLogsReturnType;

  if (!factoryLogs || factoryLogs.length === 0) {
    throw new Error("Failed to find SetupNewContract event in transaction logs");
  }

  const contractAddress = (factoryLogs[0].args as { newContract: Address }).newContract;

  return {
    contractAddress,
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
