import { z } from "zod";
import addressSchema from "./addressSchema";

export const createApiKeySchema = z.object({
  key_name: z.string().min(1, "Name is required").max(100, "Name must be 100 characters or less"),
  artist_address: addressSchema,
});
