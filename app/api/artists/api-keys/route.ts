import { NextRequest } from "next/server";
import { generateApiKey, hashApiKey, validateApiKeyFormat } from "@/lib/crypto/apiKeyGeneration";
import { insertApiKey } from "@/lib/supabase/in_process_api_keys/insertApiKey";
import { getApiKeysByArtist } from "@/lib/supabase/in_process_api_keys/getApiKeysByArtist";
import { deleteApiKey } from "@/lib/supabase/in_process_api_keys/deleteApiKey";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, artist_address } = body;

    // Validate input
    if (!name || !artist_address) {
      return Response.json(
        { error: "Name and artist_address are required" },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || name.trim().length === 0) {
      return Response.json(
        { error: "Name must be a non-empty string" },
        { status: 400 }
      );
    }

    if (typeof artist_address !== 'string') {
      return Response.json(
        { error: "Artist address must be a string" },
        { status: 400 }
      );
    }

    // Check for project secret
    const projectSecret = process.env.API_KEY_PROJECT_SECRET;
    if (!projectSecret) {
      console.error("API_KEY_PROJECT_SECRET environment variable not set");
      return Response.json(
        { error: "API key generation not configured" },
        { status: 500 }
      );
    }

    // Generate secure API key
    const rawApiKey = generateApiKey('art_pk');
    
    // Validate the generated key format
    if (!validateApiKeyFormat(rawApiKey, 'art_pk')) {
      return Response.json(
        { error: "Failed to generate valid API key" },
        { status: 500 }
      );
    }

    // Hash the key for storage
    const keyHash = hashApiKey(rawApiKey, projectSecret);

    // Store in database
    const { data, error } = await insertApiKey({
      name: name.trim(),
      artist_address: artist_address.toLowerCase(),
      key_hash: keyHash,
    });

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: "Failed to store API key" },
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
      { error: "Failed to create API key" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const artist_address = searchParams.get('artist_address');

    if (!artist_address) {
      return Response.json(
        { error: "artist_address parameter is required" },
        { status: 400 }
      );
    }

    const { data, error } = await getApiKeysByArtist(artist_address.toLowerCase());

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: "Failed to fetch API keys" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      keys: data,
    });

  } catch (e: any) {
    console.error("API key fetch error:", e);
    return Response.json(
      { error: "Failed to fetch API keys" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { key_id, artist_address } = body;

    if (!key_id || !artist_address) {
      return Response.json(
        { error: "key_id and artist_address are required" },
        { status: 400 }
      );
    }

    const { error } = await deleteApiKey(key_id, artist_address.toLowerCase());

    if (error) {
      console.error("Database error:", error);
      return Response.json(
        { error: "Failed to delete API key" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "API key deleted successfully",
    });

  } catch (e: any) {
    console.error("API key deletion error:", e);
    return Response.json(
      { error: "Failed to delete API key" },
      { status: 500 }
    );
  }
}
