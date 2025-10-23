import { NextRequest } from "next/server";
import { generateApiKey } from "@/lib/api-keys/generateApiKey";
import { hashApiKey } from "@/lib/api-keys/hashApiKey";
import { getBearerToken } from "@/lib/api-keys/getBearerToken";
import { insertApiKey } from "@/lib/supabase/in_process_api_keys/insertApiKey";
import { createApiKeySchema } from "@/lib/schema/apiKeySchema";
import { PRIVY_PROJECT_SECRET } from "@/lib/consts";
import privyClient from "@/lib/privy/client";

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const authToken = getBearerToken(authHeader);
    if (!authToken) throw new Error("Authorization header with Bearer token required");

    await privyClient.utils().auth().verifyAuthToken(authToken);

    const body = await req.json();
    const parseResult = createApiKeySchema.safeParse(body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json({ message: "Invalid input", errors: errorDetails }, { status: 400 });
    }

    const { key_name, artist_address } = parseResult.data;

    const rawApiKey = generateApiKey("art_sk");
    const keyHash = hashApiKey(rawApiKey, PRIVY_PROJECT_SECRET);

    const { error } = await insertApiKey({
      name: key_name.trim(),
      artist_address: artist_address.toLowerCase(),
      key_hash: keyHash,
    });

    if (error) throw new Error("failed to store api key");

    return Response.json({
      key: rawApiKey,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create an api key";
    return Response.json(
      {
        message,
      },
      { status: 500 }
    );
  }
}
