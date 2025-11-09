import { Address, encodeFunctionData } from "viem";
import { SalesConfigParamsType } from "@/lib/protocolSdk";
import { getCreatorClient } from "@/lib/zora/getCreatorClient";
import { CHAIN_ID, PERMISSION_BIT_ADMIN } from "@/lib/consts";
import { z } from "zod";
import { createMomentSchema } from "@/lib/schema/createContractSchema";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";
import { SplitRecipient } from "@0xsplits/splits-sdk";
import { getSplitAdminAddresses } from "@/lib/splits/getSplitAdminAddresses";

export type CreateMomentContractInput = z.infer<typeof createMomentSchema> & {
  smartAccount: Address;
  splits?: SplitRecipient[];
};

export async function create1155({
  contract,
  token,
  account,
  smartAccount,
  splits,
}: CreateMomentContractInput) {
  const creatorClient = getCreatorClient(CHAIN_ID);

  // Get all split addresses and their smart wallets for admin permissions
  const { addresses: splitAddresses, smartWallets: splitSmartWallets } =
    await getSplitAdminAddresses(splits);

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
    getAdditionalSetupActions: () => {
      const actions = [
        // Add admin permission for creator's smart wallet
        encodeFunctionData({
          abi: zoraCreator1155ImplABI,
          functionName: "addPermission",
          args: [BigInt(0), smartAccount, BigInt(PERMISSION_BIT_ADMIN)],
        }),
      ];

      // Add admin permissions for all split addresses
      for (const address of splitAddresses) {
        actions.push(
          encodeFunctionData({
            abi: zoraCreator1155ImplABI,
            functionName: "addPermission",
            args: [BigInt(0), address, BigInt(PERMISSION_BIT_ADMIN)],
          })
        );
      }

      // Add admin permissions for all split smart wallets
      for (const smartWallet of splitSmartWallets) {
        actions.push(
          encodeFunctionData({
            abi: zoraCreator1155ImplABI,
            functionName: "addPermission",
            args: [BigInt(0), smartWallet, BigInt(PERMISSION_BIT_ADMIN)],
          })
        );
      }

      return actions;
    },
  });
}
