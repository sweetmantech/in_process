import { z } from "zod";

/**
 * Zod schema for validating phone numbers in E.164 format.
 * E.164 format: +[country code][number] (e.g., +1234567890)
 */
export const phoneNumberSchema = z
  .string()
  .trim()
  .regex(/^\+[1-9]\d{1,14}$/, "phone_number must be in E.164 format (e.g., +1234567890)");

/**
 * Schema for the POST request body when registering a phone number
 */
export const registerPhoneSchema = z.object({
  phone_number: phoneNumberSchema,
});
