import { NextRequest } from "next/server";
import { requireApiKey } from "@/lib/auth/apiKeyAuth";

/**
 * Example of a protected API route that requires API key authentication
 * This file demonstrates how to use the API key middleware
 */
export async function GET(req: NextRequest) {
  // Check API key authentication
  const authError = await requireApiKey(req);
  if (authError) {
    return authError; // Returns 401 if invalid
  }

  // If we reach here, the API key is valid
  // You can now safely process the request
  return Response.json({
    success: true,
    message: "This is a protected endpoint",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  // Check API key authentication
  const authError = await requireApiKey(req);
  if (authError) {
    return authError; // Returns 401 if invalid
  }

  // Process the request body
  const body = await req.json();
  
  return Response.json({
    success: true,
    message: "Protected POST endpoint",
    received_data: body,
  });
}
