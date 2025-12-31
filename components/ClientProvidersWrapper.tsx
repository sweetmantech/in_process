"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";

const ClientProviders = dynamic(() => import("@/components/ClientProviders"), {
  ssr: false,
});

export default function ClientProvidersWrapper({ children }: { children: ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
