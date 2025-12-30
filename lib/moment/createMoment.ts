import {
  Address,
  encodeFunctionData,
  Hash,
  parseEventLogs,
  ParseEventLogsReturnType,
  getAddress,
  Hex,
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
import { addPermissionCall } from "@/lib/zora/addPermissionCall";
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

  // Get split addresses for admin permissions (when splits exist or creating new contract)
  let additionalSetupActions: ((args: { tokenId: bigint }) => Hex[]) | undefined;

  if ((resolvedSplits && resolvedSplits.length > 0) || !input.contract.address) {
    const otherAddresses: Address[] = [];

    if (resolvedSplits && resolvedSplits.length > 0) {
      const { addresses: splitAddresses, smartWallets: splitSmartWallets } =
        await getSplitAdminAddresses(resolvedSplits);
      otherAddresses.push(...splitAddresses, ...splitSmartWallets);
    }

    // Generate admin permission setup actions callback
    // smartAccount.address gets permission at tokenId = 0 (collection level)
    // Other addresses get permission at the specific tokenId level
    additionalSetupActions = (args: { tokenId: bigint }) => {
      const actions: Hex[] = [];

      // Add smartAccount permission at tokenId = 0 (collection level)
      actions.push(addPermissionCall(smartAccount.address, BigInt(0)));

      // Add other addresses permissions at specific tokenId level
      for (const address of otherAddresses) {
        actions.push(addPermissionCall(address, args.tokenId));
      }

      return actions;
    };
  }

  // Use the protocol SDK to generate calldata
  const { parameters } = await create1155({
    ...input,
    token: tokenWithPayout,
    ...(additionalSetupActions && { additionalSetupActions }),
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
