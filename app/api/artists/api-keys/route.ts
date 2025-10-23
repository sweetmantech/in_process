import { NextRequest } from "next/server";
import { generateApiKey, hashApiKey, validateApiKeyFormat } from "@/lib/api-keys";
import { insertApiKey } from "@/lib/supabase/in_process_api_keys/insertApiKey";
import { createApiKeySchema } from "@/lib/schema/apiKeySchema";
import { PROJECT_SECRET } from "@/lib/consts";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = createApiKeySchema.safeParse(body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json(
        { message: "Invalid input", errors: errorDetails },
        { status: 400 }
      );
    }
    const { key_name, artist_address } = parseResult.data;

    const rawApiKey = generateApiKey('art_sk');
    
    if (!validateApiKeyFormat(rawApiKey, 'art_sk')) {
      return Response.json(
        { 
          success: false,
          error: "Failed to generate valid API key" 
        },
        { status: 500 }
      );
    }

    const keyHash = hashApiKey(rawApiKey, PROJECT_SECRET);

    const { data, error } = await insertApiKey({
      name: key_name.trim(),
      artist_address: artist_address.toLowerCase(),
      key_hash: keyHash,
    });

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { 
          success: false,
          error: "Failed to store API key" 
        },
        { status: 500 }
      );
    }

    // Return the raw key ONLY ONCE - never store or log it
    return Response.json({
      success: true,
      api_key: rawApiKey, // Only time this is returned
      key_id: data.id,
      name: data.name,
      created_at: data.created_at,
    });

  } catch (e: any) {
    console.error("API key creation error:", e);
    return Response.json(
      { 
        success: false,
        error: "Failed to create API key" 
      },
      { status: 500 }
    );
  }
}

