// Generates a fresh cryptographically random nonce per call.
// SIWE requires at least 8 alphanumeric characters; stripping hyphens from UUID gives 32.
export const getTimeNonce = () => crypto.randomUUID().replace(/-/g, "");
