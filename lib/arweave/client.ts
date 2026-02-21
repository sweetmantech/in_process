import { TurboFactory } from "@ardrive/turbo-sdk/web";

const ARWEAVE_KEY = JSON.parse(
  Buffer.from(process.env.NEXT_PUBLIC_ARWEAVE_KEY as string, "base64").toString()
);

const turboClient = TurboFactory.authenticated({ privateKey: ARWEAVE_KEY });

export default turboClient;
