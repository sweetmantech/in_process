import { z } from "zod";
import {
  createMomentSchema,
  createWritingMomentSchema,
} from "./createContractSchema";
import { Address } from "viem";

export const convertWritingToContractSchema = (
  writingData: z.infer<typeof createWritingMomentSchema>,
  referralAddress: Address,
  contentUri: string
): z.infer<typeof createMomentSchema> => {
  return {
    contract: {
      name: writingData.contract.name,
      uri: contentUri,
    },
    token: {
      tokenMetadataURI: contentUri,
      createReferral: referralAddress as string & z.BRAND<Address>,
      salesConfig: writingData.salesConfig,
      mintToCreatorCount: 1,
    },
    account: writingData.account,
  };
};
