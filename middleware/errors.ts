export enum AuthErrorMessages {
  INVALID_AUTH_TOKEN = "Invalid authentication token",
  NO_SOCIAL_OR_ARTIST_WALLET = "No social or artist wallet found",
  INVALID_API_KEY = "Invalid API key",
  NO_ARTIST_ADDRESS_FOR_API_KEY = "No artist address found for this API key",
  NO_VALID_AUTH_METHOD = "No valid authentication method provided"
}

export enum AuthErrorTypes {
  INVALID_AUTHENTICATION = "Invalid authentication",
  UNAUTHORIZED = "Unauthorized: Must have valid origin + authToken OR valid API key"
}
