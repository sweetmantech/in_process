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
  async rewrites() {
    return [
      {
        source: "/socket.io/:path*",
        destination: "http://178.128.149.25:3000/socket.io/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
