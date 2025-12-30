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
import { createMomentSchema } from "@/lib/schema/createMomentSchema";
import { create1155 } from "@/lib/zora/create1155";
import { sendUserOperation } from "@/lib/coinbase/sendUserOperation";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { getOrCreateSmartWallet } from "../coinbase/getOrCreateSmartWallet";
import { processSplits } from "@/lib/splits/processSplits";
import { resolveSplitAddresses } from "@/lib/splits/resolveSplitAddresses";
import { getAdminPermissionSetupActions } from "@/lib/zora/getAdminPermissionSetupActions";
import { getSplitAdminAddresses } from "@/lib/splits/getSplitAdminAddresses";
import { getFactoryAddress } from "@/lib/protocolSdk/create/factory-addresses";

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
export async function createMoment(
  input: CreateMomentContractInput
): Promise<CreateContractResult> {
  const smartAccount = await getOrCreateSmartWallet({
    address: input.account as Address,
  });

  let payoutRecipient = input.token.payoutRecipient;
  let splitAddress: Address | null = null;
  const resolvedSplits = await resolveSplitAddresses(input.splits || []);

  if (resolvedSplits && resolvedSplits.length >= 2) {
    const result = await processSplits(resolvedSplits, smartAccount);
    if (result.splitAddress) {
      splitAddress = result.splitAddress;
      payoutRecipient = getAddress(splitAddress) as typeof input.token.payoutRecipient;
    }
  }

  const tokenWithPayout = {
    ...input.token,
    ...(payoutRecipient && { payoutRecipient }),
  };

  // Get split addresses for admin permissions
  const { addresses: splitAddresses, smartWallets: splitSmartWallets } =
    await getSplitAdminAddresses(resolvedSplits);

  // Generate admin permission setup actions callback
  // The callback will receive the tokenId from the Zora SDK
  const adminAddresses = [smartAccount.address, ...splitAddresses, ...splitSmartWallets];
  const additionalSetupActions = (args: { tokenId: bigint }) =>
    getAdminPermissionSetupActions(adminAddresses, args.tokenId);

  // Use the protocol SDK to generate calldata
  const { parameters } = await create1155({
    ...input,
    token: tokenWithPayout,
    additionalSetupActions,
  });

  // Check if the target address is the factory (new contract) or an existing contract
  const factoryAddress = getFactoryAddress(CHAIN_ID);
  const isNewContractByAddress = getAddress(parameters.address) === getAddress(factoryAddress);

  // Encode the function call data
  const functionCallData = encodeFunctionData({
    abi: parameters.abi,
    functionName: isNewContractByAddress ? "createContract" : "multicall",
    args: parameters.args,
  });

  // Send the transaction and wait for receipt using the helper
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

  // Parse token creation event (always present)
  const collectionLogs = parseEventLogs({
    abi: zoraCreator1155ImplABI,
    logs: transaction.logs,
    eventName: "SetupNewToken",
  }) as ParseEventLogsReturnType;

  // Parse contract creation event (only present when creating new contract)
  let contractAddress: Address;
  if (isNewContractByAddress) {
    const factoryLogs = parseEventLogs({
      abi: parameters.abi,
      logs: transaction.logs,
      eventName: "SetupNewContract",
    }) as ParseEventLogsReturnType;
    contractAddress = (factoryLogs[0].args as { newContract: Address }).newContract;
  } else {
    // Use the provided contract address when adding to existing contract
    if (input.contract.address) {
      contractAddress = getAddress(input.contract.address);
    } else {
      throw new Error("Expected contract.address when adding token to existing contract");
    }
  }

  return {
    contractAddress,
    tokenId: (collectionLogs[0].args as { tokenId: bigint }).tokenId.toString(),
    hash: transaction.transactionHash as Hash,
    chainId: CHAIN_ID,
  };
}
