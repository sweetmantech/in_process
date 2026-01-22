import { z } from "zod";
import getCorsHeader from "@/lib/getCorsHeader";

const corsHeaders = getCorsHeader();

/**
 * Validates and parses request body using zod schema.
 * Returns either the parsed data or a Response with validation errors.
 */
export function validate<T extends z.ZodTypeAny>(
  schema: T,
  body: unknown
): { success: true; data: z.infer<T> } | { success: false; response: Response } {
  const parseResult = schema.safeParse(body);

  if (!parseResult.success) {
    const errorDetails = parseResult.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return {
      success: false,
      response: Response.json(
        { message: "Invalid input", errors: errorDetails },
        { status: 400, headers: corsHeaders }
      ),
    };
  }

  return {
    success: true,
    data: parseResult.data,
  };
}
