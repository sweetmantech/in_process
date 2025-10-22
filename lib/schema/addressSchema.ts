import { z } from "zod";

const addressSchema = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/)
  .brand<`0x${string}`>();

export default addressSchema;
