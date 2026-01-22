import { NextRequest } from "next/server";
import { generateApiKey } from "@/lib/api-keys/generateApiKey";
import { hashApiKey } from "@/lib/api-keys/hashApiKey";
import { getBearerToken } from "@/lib/api-keys/getBearerToken";
import { insertApiKey } from "@/lib/supabase/in_process_api_keys/insertApiKey";
import { getApiKeys } from "@/lib/supabase/in_process_api_keys/getApiKeys";
import { deleteApiKey } from "@/lib/supabase/in_process_api_keys/deleteApiKey";
import { createApiKeySchema } from "@/lib/schema/apiKeySchema";
import { PRIVY_PROJECT_SECRET } from "@/lib/consts";
import privyClient from "@/lib/privy/client";
import { getArtistAddressByAuthToken } from "@/lib/privy/getArtistAddressByAuthToken";
import { upsertProfile } from "@/lib/supabase/in_process_artists/upsertProfile";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const authToken = getBearerToken(authHeader);
    if (!authToken) throw new Error("Authorization header with Bearer token required");

    const { artistAddress: artistAddressFromToken, socialWallet: socialWalletFromToken } =
      await getArtistAddressByAuthToken(authToken);
    const artistAddress = artistAddressFromToken || socialWalletFromToken || "";
    if (!artistAddress) throw new Error("No artist address found for this API key");

    const { data, error } = await getApiKeys(artistAddress.toLowerCase());

    if (error) throw new Error("Failed to fetch API keys");

    return Response.json({
      keys: data || [],
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to fetch API keys";
    return Response.json({ message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const authToken = getBearerToken(authHeader);
    if (!authToken) throw new Error("Authorization header with Bearer token required");

    const { artistAddress: artistAddressFromToken, socialWallet: socialWalletFromToken } =
      await getArtistAddressByAuthToken(authToken);
    const artistAddress = artistAddressFromToken || socialWalletFromToken || "";
    if (!artistAddress) throw new Error("No artist address found for this API key");

    const body = await req.json();
    const parseResult = createApiKeySchema.safeParse(body);
    if (!parseResult.success) {
      const errorDetails = parseResult.error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return Response.json({ message: "Invalid input", errors: errorDetails }, { status: 400 });
    }

    const { key_name } = parseResult.data;

    const rawApiKey = generateApiKey("art_sk");
    const keyHash = hashApiKey(rawApiKey, PRIVY_PROJECT_SECRET);

    const { error: profileError } = await upsertProfile({
      address: artistAddress.toLowerCase(),
    });
    if (profileError) throw new Error("Failed to upsert profile");

    const { error } = await insertApiKey({
      name: key_name.trim(),
      artist_address: artistAddress.toLowerCase(),
      key_hash: keyHash,
    });

    if (error) throw new Error("failed to store api key");

    return Response.json({
      key: rawApiKey,
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to create an api key";
    return Response.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const authToken = getBearerToken(authHeader);
    if (!authToken) throw new Error("Authorization header with Bearer token required");

    await privyClient.utils().auth().verifyAuthToken(authToken);

    const { searchParams } = new URL(req.url);
    const keyId = searchParams.get("keyId");

    if (!keyId) {
      return Response.json({ message: "keyId parameter required" }, { status: 400 });
    }

    const { error } = await deleteApiKey(keyId);

    if (error) throw new Error("Failed to delete API key");

    return Response.json({
      message: "API key deleted successfully",
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to delete API key";
    return Response.json({ message }, { status: 500 });
  }
}
