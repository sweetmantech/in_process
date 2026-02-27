/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Mark Privy dependencies as external to avoid bundling test files
  serverExternalPackages: [
    "@privy-io/react-auth",
    "@walletconnect/ethereum-provider",
    "thread-stream",
    "pino",
    "@ardrive/turbo-sdk",
  ],
  images: {
    loader: "custom",
    loaderFile: "./lib/media/imageLoader.ts",
  },
  turbopack: {
    resolveAlias: {
      buffer: "buffer/",
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      process: "process/browser",
      async_hooks: "./lib/async-hooks-stub.js",
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
        process: require.resolve("process/browser"),
        async_hooks: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
