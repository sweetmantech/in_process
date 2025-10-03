"use client";

import useCropImage from "@/hooks/useCropImage";
import React, { createContext, useContext, useMemo } from "react";

const CropImageContext = createContext<ReturnType<typeof useCropImage> | undefined>(undefined);

const CropImageProvider = ({ children }: { children: React.ReactNode }) => {
  const cropImage = useCropImage();

  const value = useMemo(() => ({ ...cropImage }), [cropImage]);

  return <CropImageContext.Provider value={value}>{children}</CropImageContext.Provider>;
};

const useCropImageProvider = () => {
  const context = useContext(CropImageContext);
  if (!context) {
    throw new Error("useCropImageProvider must be used within a CropImageProvider");
  }
  return context;
};

export { CropImageProvider, useCropImageProvider };
