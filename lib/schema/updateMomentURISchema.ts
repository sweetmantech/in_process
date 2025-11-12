import { z } from "zod";

export const updateMomentURISchema = z.object({
  tokenContractAddress: z.string(),
  tokenId: z.string(),
  newUri: z.string(),
});
