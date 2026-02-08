/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mark Privy dependencies as external to avoid bundling test files
  serverExternalPackages: [
    "@privy-io/react-auth",
    "@walletconnect/ethereum-provider",
    "thread-stream",
    "pino",
  ],
  images: {
    loader: "custom",
    loaderFile: "./lib/media/imageLoader.ts",
  },
};

module.exports = nextConfig;
