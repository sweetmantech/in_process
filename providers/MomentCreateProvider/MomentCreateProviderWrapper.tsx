"use client";

import React from "react";
import { MomentFormProvider } from "../MomentFormProvider";
import { MomentMetadataProvider } from "../MomentMetadataProvider";
import { MomentCreateProvider } from "./MomentCreateProvider";

interface MomentCreateProviderWrapperProps {
  children: React.ReactNode;
}

const MomentCreateProviderWrapper = ({ children }: MomentCreateProviderWrapperProps) => {
  return (
    <MomentFormProvider>
      <MomentMetadataProvider>
        <MomentCreateProvider>{children}</MomentCreateProvider>
      </MomentMetadataProvider>
    </MomentFormProvider>
  );
};

export default MomentCreateProviderWrapper;
