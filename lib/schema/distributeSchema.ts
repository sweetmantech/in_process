import { z } from "zod";
import { zeroAddress } from "viem";
import addressSchema from "./addressSchema";
import { CHAIN_ID } from "../consts";

export const distributeSchema = z.object({
  splitAddress: addressSchema,
  tokenAddress: addressSchema
    .optional()
    .transform((val) => (val === undefined ? zeroAddress : val)),
  chainId: z.coerce.number().optional().default(CHAIN_ID),
});
