import { Address, Hex } from "viem";
import { SalesConfigParamsType } from "@/lib/protocolSdk";
import { getCreatorClient } from "@/lib/zora/getCreatorClient";
import { CHAIN_ID } from "@/lib/consts";
import { z } from "zod";
import { createMomentSchema } from "@/lib/schema/createMomentSchema";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema> & {
  additionalSetupActions?: Hex[] | ((args: { tokenId: bigint }) => Hex[]);
};

export async function create1155(input: CreateMomentContractInput) {
  const creatorClient = getCreatorClient(CHAIN_ID);

  const tokenParams = {
    ...input.token,
    createReferral: input.token.createReferral as Address,
    payoutRecipient: input.token.payoutRecipient as Address | undefined,
    salesConfig: {
      ...input.token.salesConfig,
      type: input.token.salesConfig.type as
        | "erc20Mint"
        | "fixedPrice"
        | "timed"
        | "allowlistMint"
        | undefined,
      currency: input.token.salesConfig.currency as Address | undefined,
      saleStart: BigInt(input.token.salesConfig.saleStart),
      saleEnd: BigInt(input.token.salesConfig.saleEnd),
    } as SalesConfigParamsType,
  };

  const commonParams = {
    token: tokenParams,
    account: input.account as Address,
    getAdditionalSetupActions: input.additionalSetupActions
      ? typeof input.additionalSetupActions === "function"
        ? input.additionalSetupActions
        : () => input.additionalSetupActions as Hex[]
      : undefined,
  };

  // Check if creating new contract or adding to existing contract
  // If contract.address is provided, use existing contract; otherwise create new contract
  if (input.contract.address) {
    return creatorClient.create1155OnExistingContract({
      ...commonParams,
      contractAddress: input.contract.address,
    });
  } else {
    // Create new contract - contract.name and contract.uri are required (validated by schema)
    return creatorClient.create1155({
      ...commonParams,
      contract: {
        name: input.contract.name!,
        uri: input.contract.uri!,
      },
    });
  }
}
