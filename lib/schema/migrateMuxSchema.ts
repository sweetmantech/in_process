import { z } from "zod";

export const migrateMuxSchema = z.object({
  tokenContractAddress: z.string(),
  tokenId: z.string(),
});
