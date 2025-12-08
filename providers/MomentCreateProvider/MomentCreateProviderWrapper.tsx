"use client";

import React from "react";
import { MetadataFormProvider } from "../MetadataFormProvider";
import { MomentMetadataProvider } from "../MomentMetadataProvider";
import { MomentCreateProvider } from "./MomentCreateProvider";

interface MomentCreateProviderWrapperProps {
  children: React.ReactNode;
}

const MomentCreateProviderWrapper = ({ children }: MomentCreateProviderWrapperProps) => {
  return (
    <MetadataFormProvider>
      <MomentMetadataProvider>
        <MomentCreateProvider>{children}</MomentCreateProvider>
      </MomentMetadataProvider>
    </MetadataFormProvider>
  );
};

export default MomentCreateProviderWrapper;
