"use client";

import SMSMoment from "./SMSMoment";
import { MomentProvider } from "@/providers/MomentProvider";
import { useParams } from "next/navigation";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { Address } from "viem";
import { MetadataFormProvider } from "@/providers/MetadataFormProvider";
import { MetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { MomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";

const SMSMomentPage = () => {
  const params = useParams();
  const collectionAddress = params.collectionAddress as string;
  const tokenId = params.tokenId as string;

  const { chainId, address } = parseCollectionAddress(collectionAddress);

  if (!address || !chainId) {
    return null;
  }

  return (
    <main className="flex w-screen grow">
      <div className="flex w-full flex-col items-center justify-center pt-12 md:pt-14">
        <MetadataFormProvider>
          <MetadataUploadProvider>
            <MomentProvider
              moment={{
                collectionAddress: address as Address,
                tokenId,
                chainId,
              }}
            >
              <MomentUriUpdateProvider>
                <SMSMoment />
              </MomentUriUpdateProvider>
            </MomentProvider>
          </MetadataUploadProvider>
        </MetadataFormProvider>
      </div>
    </main>
  );
};

export default SMSMomentPage;
