import { TurboFactory } from "@ardrive/turbo-sdk/web";

if (!process.env.NEXT_PUBLIC_ARWEAVE_KEY) {
  throw new Error("NEXT_PUBLIC_ARWEAVE_KEY environment variable is not set");
}

const ARWEAVE_KEY = JSON.parse(
  Buffer.from(process.env.NEXT_PUBLIC_ARWEAVE_KEY, "base64").toString(),
);

const turboClient: any = TurboFactory.authenticated({
  privateKey: ARWEAVE_KEY,
});

export default turboClient;
