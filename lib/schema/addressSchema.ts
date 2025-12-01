import { z } from "zod";
import { getAddress, type Address } from "viem";

const addressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/)
  .transform((val) => getAddress(val).toLowerCase() as Address);

export default addressSchema;
