import { z } from "zod";
import { momentSchema } from "./commentsSchema";

export const collectSchema = z.object({
  moment: momentSchema,
  comment: z.string(),
  amount: z.number(),
});
