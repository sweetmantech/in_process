import { createApiKeyMessage } from './wallet-auth';

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

  /**
   * Create an API key for a new artist using wallet signature
   * @param artistAddress The artist's wallet address
   * @param signature The signature of the message
   * @param keyName The name for the API key
   */
  static async createInitialApiKey(
    artistAddress: string,
    signature: string,
    keyName: string
  ): Promise<{ success: boolean; apiKey?: any; error?: string }> {
    try {
      const response = await fetch('/api/api-keys/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistAddress,
          signature,
          keyName,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to create API key',
      };
    }
  }

  /**
   * Create or update an API key for an existing artist using API key authentication
   * @param apiKey The existing API key for authentication
   * @param keyName The name for the API key
   */
  static async updateApiKey(
    apiKey: string,
    keyName: string
  ): Promise<{ success: boolean; apiKey?: any; error?: string }> {
    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({
          keyName,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to update API key',
      };
    }
  }

  /**
   * Get existing API key for an artist
   * @param apiKey The API key for authentication
   */
  static async getApiKey(
    apiKey: string
  ): Promise<{ success: boolean; apiKey?: any; error?: string }> {
    try {
      const response = await fetch('/api/api-keys', {
        method: 'GET',
        headers: {
          'x-api-key': apiKey,
        },
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get API key',
      };
    }
  }

  /**
   * Get existing API key for an artist using wallet signature
   * @param artistAddress The artist's wallet address
   * @param signature The signature of the message
   */
  static async getApiKeyWithWallet(
    artistAddress: string,
    signature: string
  ): Promise<{ success: boolean; apiKey?: any; error?: string }> {
    try {
      const response = await fetch('/api/api-keys/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistAddress,
          signature,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get API key',
      };
    }
  }
}
