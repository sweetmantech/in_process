import { z } from "zod";
import addressSchema from "./addressSchema";
import { CHAIN_ID } from "../consts";

export const momentSchema = z.object({
  tokenId: z.string(),
  collectionAddress: addressSchema,
  chainId: z.coerce.number().optional().default(CHAIN_ID),
});
