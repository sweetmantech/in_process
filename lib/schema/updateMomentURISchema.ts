import { z } from "zod";
import { momentSchema } from "./collectSchema";

export const updateMomentURISchema = z.object({
  moment: momentSchema,
  newUri: z.string(),
  amount: z.number().optional(),
  comment: z.string().optional(),
});
