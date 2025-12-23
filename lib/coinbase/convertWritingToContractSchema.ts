import { z } from "zod";
import { createMomentSchema, createWritingMomentSchema } from "../schema/createMomentSchema";

export const convertWritingToContractSchema = (
  writingData: z.infer<typeof createWritingMomentSchema>,
  contentUri: string
): z.infer<typeof createMomentSchema> => {
  // Handle unified contract format: if address is provided, use it; otherwise use name/uri
  const contract = writingData.contract.address
    ? {
        address: writingData.contract.address,
      }
    : {
        name: writingData.contract.name!,
        uri: contentUri,
      };

  return {
    contract,
    token: {
      tokenMetadataURI: contentUri,
      createReferral: writingData.token.createReferral,
      salesConfig: writingData.token.salesConfig,
      mintToCreatorCount: writingData.token.mintToCreatorCount,
      payoutRecipient: writingData.token.payoutRecipient,
    },
    account: writingData.account,
    splits: writingData.splits,
  };
};
