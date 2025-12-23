import { Address, Hex } from "viem";
import { SalesConfigParamsType } from "@/lib/protocolSdk";
import { getCreatorClient } from "@/lib/zora/getCreatorClient";
import { CHAIN_ID } from "@/lib/consts";
import { z } from "zod";
import { createMomentSchema } from "@/lib/schema/createMomentSchema";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema> & {
  additionalSetupActions?: Hex[];
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
      ? () => input.additionalSetupActions!
      : undefined,
  };

  // Check if creating new contract or adding to existing contract
  if ("contract" in input) {
    return creatorClient.create1155({
      ...commonParams,
      contract: input.contract,
    });
  } else {
    return creatorClient.create1155OnExistingContract({
      ...commonParams,
      contractAddress: input.contractAddress,
    });
  }
}
