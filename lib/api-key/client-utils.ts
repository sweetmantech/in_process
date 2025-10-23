import { createApiKeyMessage } from "./wallet-auth";

/**
 * Client-side utilities for API key management
 */
export class ApiKeyClient {
  /**
   * Get the message that artists need to sign for API key creation
   */
  static getSignMessage(artistAddress: string): string {
    return createApiKeyMessage(artistAddress);
  }
}
