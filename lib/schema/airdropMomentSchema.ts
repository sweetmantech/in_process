import { z } from "zod";
import addressSchema from "./addressSchema";
import bigIntString from "./bigIntSchema";
import { momentSchema } from "./momentSchema";

export const recipientsSchema = z.array(
  z.object({
    recipientAddress: addressSchema,
    tokenId: bigIntString,
  })
);

export const airdropMomentSchema = z.object({
  recipients: recipientsSchema,
  moment: momentSchema,
});
