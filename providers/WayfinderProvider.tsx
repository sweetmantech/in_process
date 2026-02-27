"use client";

import {
  StaticGatewaysProvider,
  FastestPingRoutingStrategy,
  SimpleCacheRoutingStrategy,
  HashVerificationStrategy,
} from "@ar.io/wayfinder-core";
import { WayfinderProvider as BaseWayfinderProvider } from "@ar.io/wayfinder-react";
import { ReactNode } from "react";

const gatewaysProvider = new StaticGatewaysProvider({
  gateways: ["https://arweave.net", "https://permagate.io", "https://ar-io.net", "https://g8way.io"],
});

const routingStrategy = new SimpleCacheRoutingStrategy({
  routingStrategy: new FastestPingRoutingStrategy({
    timeoutMs: 5000,
    gatewaysProvider,
  }),
  ttlSeconds: 300,
});

const verificationStrategy = new HashVerificationStrategy({
  trustedGateways: [
    new URL("https://arweave.net"),
    new URL("https://permagate.io"),
    new URL("https://ar-io.net"),
  ],
});

export default function WayfinderProvider({ children }: { children: ReactNode }) {
  return (
    <BaseWayfinderProvider
      routingSettings={{ strategy: routingStrategy }}
      verificationSettings={{ enabled: true, strict: false, strategy: verificationStrategy }}
    >
      {children}
    </BaseWayfinderProvider>
  );
}
