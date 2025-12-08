"use client";

import sdk, { type Context } from "@farcaster/frame-sdk";
import { useState, useEffect, ReactNode, createContext, useContext, useMemo } from "react";

interface FrameContextType {
  context: Context.FrameContext | undefined;
}

const FrameContext = createContext<FrameContextType>({} as FrameContextType);

export default function FrameProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);
  const [context, setContext] = useState<Context.FrameContext>();

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      setContext(context);
      sdk.actions.ready();
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const value = useMemo(
    () => ({
      context,
    }),
    [context]
  );

  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>;
}

export const useFrameProvider = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error("useFrameProvider must be used within a FrameProvider");
  }
  return context;
};
