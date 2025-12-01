import { z } from "zod";
import { momentSchema } from "./momentSchema";

export const updateMomentURISchema = z.object({
  moment: momentSchema,
  newUri: z.string(),
});
