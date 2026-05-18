"use client";

import sdk, { type Context } from "@farcaster/miniapp-sdk";
import { useState, useEffect, ReactNode, createContext, useContext, useMemo } from "react";

interface MiniAppContextType {
  context: Context.MiniAppContext | undefined;
  miniAppReady: boolean;
  isMiniApp: boolean;
}

const MiniAppContext = createContext<MiniAppContextType>({} as MiniAppContextType);

export default function MiniAppProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);
  const [context, setContext] = useState<Context.MiniAppContext>();
  const [miniAppReady, setMiniAppReady] = useState<boolean>(false);
  const [isInMiniApp, setIsInMiniApp] = useState<boolean>(false);

  const isMiniApp = isInMiniApp && miniAppReady;

  useEffect(() => {
    const load = async () => {
      try {
        const [inMiniApp, ctx] = await Promise.all([sdk.isInMiniApp(), sdk.context]);
        setIsInMiniApp(inMiniApp);
        if (inMiniApp) {
          setContext(ctx);
          await sdk.actions.ready();
        }
      } finally {
        setMiniAppReady(true);
      }
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const value = useMemo(
    () => ({
      context,
      miniAppReady,
      isMiniApp,
    }),
    [context, miniAppReady, isMiniApp]
  );

  return <MiniAppContext.Provider value={value}>{children}</MiniAppContext.Provider>;
}

export const useMiniAppProvider = () => {
  const context = useContext(MiniAppContext);
  if (!context) {
    throw new Error("useMiniAppProvider must be used within a MiniAppProvider");
  }
  return context;
};
