"use client";

import React from "react";
import { MomentCreateFormProvider } from "./MomentCreateFormProvider";
import { MomentMetadataProvider } from "./MomentMetadataProvider";
import { MomentCreateProvider } from "./MomentCreateProvider";

interface MomentCreateProviderWrapperProps {
  children: React.ReactNode;
}

const MomentCreateProviderWrapper = ({ children }: MomentCreateProviderWrapperProps) => {
  return (
    <MomentCreateFormProvider>
      <MomentMetadataProvider>
        <MomentCreateProvider>{children}</MomentCreateProvider>
      </MomentMetadataProvider>
    </MomentCreateFormProvider>
  );
};

export default MomentCreateProviderWrapper;
