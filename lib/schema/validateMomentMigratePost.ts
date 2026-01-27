import { NextRequest } from "next/server";
import getCorsHeader from "@/lib/getCorsHeader";
import { authMiddleware, AuthResult } from "@/middleware/authMiddleware";
import { migrateMomentsSchema } from "./migrateMomentsSchema";
import { validate } from "./validate";

/**
 * Validates authentication and request body for moment migrate POST handler.
 * Returns either the parsed auth and body data or a Response with errors.
 */
export async function validateMomentMigratePost(
  req: NextRequest,
  corsHeaders?: Record<string, string>
): Promise<
  | { success: true; data: { auth: AuthResult; body: { chainId: number } } }
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
  const validationResult = validate(migrateMomentsSchema, body);
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
