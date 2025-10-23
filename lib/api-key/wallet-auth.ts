import { NextRequest } from "next/server";
import { recoverMessageAddress } from "viem";
import { Address } from "viem";

export interface WalletAuthenticatedRequest extends NextRequest {
  walletAddress?: Address;
  params?: { [key: string]: string };
}

/**
 * Create a message for artists to sign for API key creation
 */
export function createApiKeyMessage(artistAddress: string): string {
  return `Sign this message to create your In Process API key.

Artist Address: ${artistAddress}
Timestamp: ${Date.now()}

This signature proves you control this wallet address and allows you to create an API key for programmatic access to In Process.`;
}

/**
 * Verify wallet signature for API key creation
 */
export async function validateWalletSignature(
  request: NextRequest
): Promise<{ isValid: boolean; walletAddress?: Address; error?: string }> {
  try {
    const body = await request.json();
    const { signature, artistAddress } = body;

    if (!signature || !artistAddress) {
      return {
        isValid: false,
        error: "signature and artistAddress are required",
      };
    }

    // Create the message that should have been signed
    const expectedMessage = createApiKeyMessage(artistAddress);

    // Recover the address from the signature
    const recoveredAddress = await recoverMessageAddress({
      message: expectedMessage,
      signature: signature as `0x${string}`,
    });

    // Verify the recovered address matches the claimed artist address
    if (recoveredAddress.toLowerCase() !== artistAddress.toLowerCase()) {
      return {
        isValid: false,
        error: "Signature does not match the provided artist address",
      };
    }

    return {
      isValid: true,
      walletAddress: recoveredAddress,
    };
  } catch (error: any) {
    console.error("Error validating wallet signature:", error);
    return {
      isValid: false,
      error: "Invalid signature format",
    };
  }
}

/**
 * Middleware wrapper for wallet signature authentication
 * Used for initial API key creation when no API key exists yet
 */
export function withWalletAuth(handler: (req: WalletAuthenticatedRequest) => Promise<Response>) {
  return async (req: NextRequest): Promise<Response> => {
    const validation = await validateWalletSignature(req);

    if (!validation.isValid) {
      return Response.json({ error: validation.error }, { status: 401 });
    }

    // Add wallet address to request
    const authenticatedReq = req as WalletAuthenticatedRequest;
    authenticatedReq.walletAddress = validation.walletAddress!;

    // Execute the handler
    return await handler(authenticatedReq);
  };
}
