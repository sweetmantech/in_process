import { Address, encodeFunctionData } from "viem";
import { SalesConfigParamsType } from "@/lib/protocolSdk";
import { getCreatorClient } from "@/lib/zora/getCreatorClient";
import { CHAIN_ID, PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { z } from "zod";
import { createMomentSchema } from "@/lib/coinbase/createContractSchema";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema> & {
  smartAccount: Address;
};

export async function create1155({
  contract,
  token,
  account,
  smartAccount,
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
    getAdditionalSetupActions: (args) => {
      return [
        encodeFunctionData({
          abi: zoraCreator1155ImplABI,
          functionName: "addPermission",
          args: [args.tokenId, smartAccount, BigInt(PERMISSION_BIT_ADMIN)],
        }),
      ];
    },
  });
}
