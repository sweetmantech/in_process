import { NextRequest } from "next/server";
import { getBearerToken } from "@/lib/api-keys/getBearerToken";
import { deleteApiKey } from "@/lib/supabase/in_process_api_keys/deleteApiKey";
import privyClient from "@/lib/privy/client";

export async function DELETE(req: NextRequest, { params }: { params: { keyId: string } }) {
  try {
    const authHeader = req.headers.get("authorization");
    const authToken = getBearerToken(authHeader);
    if (!authToken) throw new Error("Authorization header with Bearer token required");

    await privyClient.utils().auth().verifyAuthToken(authToken);

    const { keyId } = params;

    if (!keyId) {
      return Response.json({ message: "keyId parameter required" }, { status: 400 });
    }

    const { error } = await deleteApiKey(keyId);

    if (error) throw new Error("Failed to delete API key");

    return Response.json({
      success: true,
      message: "API key deleted successfully",
    });
  } catch (e: any) {
    console.log(e);
    const message = e?.message ?? "failed to delete API key";
    return Response.json(
      {
        message,
      },
      { status: 500 }
    );
  }
}
