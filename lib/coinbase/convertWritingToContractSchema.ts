import { z } from "zod";
import {
  createMomentSchema,
  createWritingMomentSchema,
} from "./createContractSchema";

export const convertWritingToContractSchema = (
  writingData: z.infer<typeof createWritingMomentSchema>,
  referralAddress: any,
  contentUri: string
): z.infer<typeof createMomentSchema> => {
  return {
    contract: {
      name: writingData.contract.name,
      uri: contentUri,
    },
    token: {
      tokenMetadataURI: contentUri,
      createReferral: referralAddress,
      salesConfig: writingData.salesConfig,
      mintToCreatorCount: 1,
    },
    account: writingData.account,
  };
};
