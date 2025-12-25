import { z } from "zod";
import { momentSchema } from "./momentSchema";
import addressSchema from "./addressSchema";

export const permissionSchema = z.object({
  moment: momentSchema,
  adminAddress: addressSchema,
});
