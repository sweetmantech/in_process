import { z } from "zod";
import { CHAIN_ID } from "../consts";

export const migrateMomentsSchema = z.object({
  chainId: z.coerce.number().optional().default(CHAIN_ID),
});
