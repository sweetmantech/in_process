import { z } from "zod";
import { createMomentSchema, createWritingMomentSchema } from "../schema/createMomentSchema";

export const convertWritingToContractSchema = (
  writingData: z.infer<typeof createWritingMomentSchema>,
  contentUri: string
): z.infer<typeof createMomentSchema> => {
  return {
    contractAddress: writingData.contractAddress,
    token: {
      tokenMetadataURI: contentUri,
      createReferral: writingData.token.createReferral,
      salesConfig: writingData.token.salesConfig,
      mintToCreatorCount: writingData.token.mintToCreatorCount,
    },
    account: writingData.account,
  };
};
