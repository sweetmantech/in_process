import { z } from "zod";
import { momentSchema } from "./momentSchema";

export const collectSchema = z.object({
  moment: momentSchema,
  comment: z.string(),
  amount: z.number(),
});
