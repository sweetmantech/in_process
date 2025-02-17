import { TurboFactory } from "@ardrive/turbo-sdk";

if (!process.env.ARWEAVE_KEY) {
  throw new Error("ARWEAVE_KEY environment variable is not set");
}

const ARWEAVE_KEY = JSON.parse(
  Buffer.from(process.env.ARWEAVE_KEY, "base64").toString(),
);

const turboClient = TurboFactory.authenticated({
  privateKey: ARWEAVE_KEY,
});

export default turboClient;
