export interface ApiKeyValidationResult {
  isValid: boolean;
  error?: string;
  apiKey?: {
    id: string;
    artistAddress: string;
    keyName: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CreateApiKeyRequest {
  keyName: string;
}

export interface CreateApiKeyResponse {
  id: string;
  apiKey: string;
  keyName: string;
  artistAddress: string;
  isActive: boolean;
  createdAt: string;
}

export interface ApiKeyInfo {
  id: string;
  keyName: string;
  apiKeyPrefix: string;
  artistAddress: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
