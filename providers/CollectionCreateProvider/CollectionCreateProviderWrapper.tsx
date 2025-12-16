"use client";

import { CreateCollectionProvider } from "./CreateCollectionProvider";
import CreateCollectionModal from "@/components/CreateForm/CreateCollectionModal";
import { MetadataUploadProvider } from "../MetadataUploadProvider";
import { MetadataFormProvider } from "../MetadataFormProvider";

const CollectionCreateProviderWrapper = () => {
  return (
    <MetadataFormProvider>
      <MetadataUploadProvider>
        <CreateCollectionProvider>
          <CreateCollectionModal />
        </CreateCollectionProvider>
      </MetadataUploadProvider>
    </MetadataFormProvider>
  );
};

export default CollectionCreateProviderWrapper;
