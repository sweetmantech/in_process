"use client";

import React from "react";
import { MetadataFormProvider } from "../MetadataFormProvider";
import { MetadataUploadProvider } from "../MetadataUploadProvider";
import { MomentCreateProvider } from "./MomentCreateProvider";

interface MomentCreateProviderWrapperProps {
  children: React.ReactNode;
}

const MomentCreateProviderWrapper = ({ children }: MomentCreateProviderWrapperProps) => {
  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <MomentCreateProvider>{children}</MomentCreateProvider>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default MomentCreateProviderWrapper;
