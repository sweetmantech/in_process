"use client";

import sdk from "@farcaster/frame-sdk";
import React, { useState, useEffect, ReactNode } from "react";

export default function FrameProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      sdk.actions.ready();
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  return <React.Fragment>{children}</React.Fragment>;
}
