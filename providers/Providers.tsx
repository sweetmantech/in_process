"use client";

import { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <PrivyProvider>{children}</PrivyProvider>;
}
