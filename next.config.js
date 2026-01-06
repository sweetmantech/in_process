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
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.privy.io https://*.vercel-insights.com https://*.vercel-analytics.com https://*.vercel-scripts.com https://*.walletconnect.com https://*.walletconnect.org https://unpkg.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https: blob:",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https: wss: blob: https://*.privy.io https://*.walletconnect.com https://*.walletconnect.org https://*.alchemy.com https://*.alchemyapi.io",
              "frame-src 'self' https://*.privy.io https://*.mux.com https://*.arweave.net https://*.ipfs.io https://ipfs.io https://gateway.pinata.cloud https://*.walletconnect.com",
              "media-src 'self' https: blob:",
              "worker-src 'self' blob: https://unpkg.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
