import { PrivyClient } from "@privy-io/node";

// Decode JWT verification key from base64
const decodedJwtVerificationKey = Buffer.from(
  process.env.PRIVY_JWT_VERIFICATION_KEY!,
  "base64"
).toString("utf8");

console.log("decodedJwtVerificationKey", decodedJwtVerificationKey);

const privyClient = new PrivyClient({
  appId: process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  appSecret: process.env.PRIVY_API_KEY!,
  jwtVerificationKey: decodedJwtVerificationKey,
});

export default privyClient;
