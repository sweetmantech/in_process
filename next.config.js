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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
