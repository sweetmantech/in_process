import { z } from "zod";
import {
  createMomentSchema,
  createWritingMomentSchema,
} from "./createContractSchema";

export const convertWritingToContractSchema = (
  writingData: z.infer<typeof createWritingMomentSchema>,
  contentUri: string
): z.infer<typeof createMomentSchema> => {
  return {
    contract: {
      name: writingData.contract.name,
      uri: contentUri,
    },
    token: {
      tokenMetadataURI: contentUri,
      createReferral: writingData.token.createReferral,
      salesConfig: writingData.token.salesConfig,
      mintToCreatorCount: writingData.token.mintToCreatorCount,
    },
    account: writingData.account,
  };
};
