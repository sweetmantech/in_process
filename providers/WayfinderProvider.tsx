"use client";

import { WayfinderProvider as BaseWayfinderProvider } from "@ar.io/wayfinder-react";
import { ReactNode } from "react";
import routingStrategy from "@/lib/wayfinder/routingStrategy";
import verificationStrategy from "@/lib/wayfinder/verificationStrategy";

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
