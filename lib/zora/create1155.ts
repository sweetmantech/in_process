import { Address } from "viem";
import { SalesConfigParamsType } from "@/lib/protocolSdk";
import { getCreatorClient } from "@/lib/zora/getCreatorClient";
import { CHAIN_ID } from "@/lib/consts";
import { z } from "zod";
import { createMomentSchema } from "@/lib/coinbase/createContractSchema";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema>;

export async function create1155({
  contract,
  token,
  account,
}: CreateMomentContractInput) {
  const creatorClient = getCreatorClient(CHAIN_ID);
  return creatorClient.create1155({
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
}
