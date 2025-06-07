import { Address, encodeFunctionData, Hash, parseEventLogs } from "viem";
import { z } from "zod";
import { publicClient, getPublicClient } from "@/lib/viem/publicClient";
import cdp from "@/lib/coinbase/client";
import { CDP_PAYMASTER_URL, CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { createMomentSchema } from "@/lib/coinbase/createContractSchema";
import { createCreatorClient, SalesConfigParamsType } from "@/lib/protocolSdk";

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
  token,
  account,
}: CreateMomentContractInput): Promise<CreateContractResult> {
  // Create a new EOA
  const evmAccount = await cdp.evm.createAccount();

  // Create a smart account (contract wallet)
  const smartAccount = await cdp.evm.createSmartAccount({ owner: evmAccount });

  // Use the protocol SDK to generate calldata
  const publicClientForSdk = getPublicClient(CHAIN_ID);
  const creatorClient = createCreatorClient({
    chainId: CHAIN_ID,
    publicClient: publicClientForSdk,
  });
  const { parameters } = await creatorClient.create1155({
    contract,
    token: {
      ...token,
      createReferral: token.createReferral as Address,
      salesConfig: {
        ...token.salesConfig,
        type: token.salesConfig.type as
          | "erc20Mint"
          | "fixedPrice"
          | "timed"
          | "allowlistMint"
          | undefined,
        currency: token.salesConfig.currency as Address | undefined,
        saleStart: BigInt(token.salesConfig.saleStart),
        saleEnd: BigInt(token.salesConfig.saleEnd),
      } as SalesConfigParamsType,
    },
    account: account as Address,
  });

  // Encode the function call data
  const createContractData = encodeFunctionData({
    abi: parameters.abi,
    functionName: "createContract",
    args: parameters.args,
  });

  // Send the transaction
  const sendResult = await cdp.evm.sendUserOperation({
    smartAccount,
    network: IS_TESTNET ? "base-sepolia" : "base",
    paymasterUrl: CDP_PAYMASTER_URL,
    calls: [
      {
        to: parameters.address as Address,
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
    abi: parameters.abi,
    logs: transaction.logs,
    eventName: "SetupNewContract",
  });

  return {
    contractAddress: topics[0].args.newContract,
    hash: userOp.transactionHash as Hash,
  };
}
