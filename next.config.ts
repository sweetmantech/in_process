import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
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
        "node:buffer": "buffer",
        "node:stream": "stream-browserify",
        "node:crypto": "crypto-browserify",
        "node:util": "util",
        "node:process": "process/browser",
        "node:fs": false,
        "node:path": "path-browserify",
        "node:url": "url",
        "node:http": "stream-http",
        "node:https": "https-browserify",
        "node:os": "os-browserify/browser",
        "node:events": "events",
        "node:assert": "assert",
        process: "process/browser",
        path: "path-browserify",
        url: "url",
        http: "stream-http",
        https: "https-browserify",
        os: "os-browserify/browser",
        util: "util",
        events: "events",
        assert: "assert",
      };

      // Add aliases for node: protocol imports
      config.resolve.alias = {
        ...config.resolve.alias,
        "node:buffer": "buffer",
        "node:crypto": "crypto-browserify",
        "node:stream": "stream-browserify",
        "node:stream/web": "stream-browserify",
        "node:path": "path-browserify",
        "node:url": "url",
        "node:http": "stream-http",
        "node:https": "https-browserify",
        "node:os": "os-browserify/browser",
        "node:process": "process/browser",
        "node:util": "util",
        "node:fs": false,
        "node:events": "events",
        "node:assert": "assert",
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
  }
};

export default nextConfig;
