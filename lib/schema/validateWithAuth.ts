import { z } from "zod";
import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware, AuthResult } from "@/middleware/authMiddleware";
import { validate } from "./validate";

/**
 * Validates authentication and request body using zod schema.
 * Returns either the parsed auth and body data or a Response with errors.
 */
export async function validateWithAuth<T extends z.ZodTypeAny>(
  req: NextRequest,
  schema: T,
  corsHeaders?: Record<string, string>
): Promise<
  | { success: true; data: { auth: AuthResult; body: z.infer<T> } }
  | { success: false; response: Response }
> {
  const headers = corsHeaders || getCorsHeader();

  // First, validate authentication
  const authResult = await authMiddleware(req, { corsHeaders: headers });
  if (authResult instanceof Response) {
    return { success: false, response: authResult };
  }

  // Then, parse and validate the request body
  const body = await req.json();
  const validationResult = validate(schema, body);
  if (!validationResult.success) {
    return validationResult;
  }

  return {
    success: true,
    data: {
      auth: authResult,
      body: validationResult.data,
    },
  };
}
