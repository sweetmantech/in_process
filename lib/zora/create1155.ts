import { Address, Hex } from "viem";
import { SalesConfigParamsType } from "@/lib/protocolSdk";
import { getCreatorClient } from "@/lib/zora/getCreatorClient";
import { CHAIN_ID } from "@/lib/consts";
import { z } from "zod";
import { createMomentSchema } from "@/lib/schema/createContractSchema";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema> & {
  additionalSetupActions?: Hex[];
};

export async function create1155({
  contract,
  token,
  account,
  additionalSetupActions,
}: CreateMomentContractInput) {
  const creatorClient = getCreatorClient(CHAIN_ID);

  return creatorClient.create1155({
    contract,
    token: {
      ...token,
      createReferral: token.createReferral as Address,
      payoutRecipient: token.payoutRecipient as Address | undefined,
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
    getAdditionalSetupActions: additionalSetupActions ? () => additionalSetupActions : undefined,
  });
}
