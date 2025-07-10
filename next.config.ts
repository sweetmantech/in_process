import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Add polyfills for browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: "crypto-browserify",
        stream: "stream-browserify",
        buffer: "buffer",
        process: "process/browser",
        path: "path-browserify",
        url: "url",
        http: "stream-http",
        https: "https-browserify",
        os: "os-browserify/browser",
      };
    }

    config.externals.push("pino-pretty", "lokijs", "encoding");

    return config;
  },
  // Transpile the Turbo SDK package
  transpilePackages: ["@ardrive/turbo-sdk"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
