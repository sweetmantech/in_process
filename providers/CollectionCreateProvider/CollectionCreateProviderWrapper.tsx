"use client";

import { CreateCollectionProvider } from "./CreateCollectionProvider";
import { MetadataUploadProvider } from "../MetadataUploadProvider";
import { MetadataFormProvider } from "../MetadataFormProvider";

interface CollectionCreateProviderWrapperProps {
  children: React.ReactNode;
}

const CollectionCreateProviderWrapper = ({ children }: CollectionCreateProviderWrapperProps) => {
  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <CreateCollectionProvider>{children}</CreateCollectionProvider>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default CollectionCreateProviderWrapper;
