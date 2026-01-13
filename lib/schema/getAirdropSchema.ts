import { z } from "zod";
import addressSchema from "./addressSchema";
import { CHAIN_ID } from "../consts";

export const getAirdropSchema = z.object({
  artist_address: addressSchema,
  chainId: z.coerce.number().optional().default(CHAIN_ID),
  offset: z.coerce.number().optional().default(100),
});
