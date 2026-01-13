import { z } from "zod";
import { momentSchema } from "./momentSchema";

export const getAirdropSchema = z.object({
  moment: momentSchema,
  offset: z.number(),
});
