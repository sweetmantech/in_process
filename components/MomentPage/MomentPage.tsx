"use client";

import Moment from "./Moment";
import { MomentProvider } from "@/providers/MomentProvider";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentCollectProvider } from "@/providers/MomentCollectProvider";
import { MomentCollectorsProvider } from "@/providers/MomentCollectorsProvider";
import { useParams } from "next/navigation";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import { Address } from "viem";

const MomentPage = () => {
  const params = useParams();
  const collection = params.collection as string;
  const tokenId = params.tokenId as string;

  const { chainId, address } = parseCollectionAddress(collection);

  if (!address || !chainId) {
    return null;
  }

  return (
    <main className="flex w-screen grow">
      <div className="flex w-full flex-col items-center justify-center pt-12 md:pt-14">
        <MomentProvider
          moment={{
            collectionAddress: address as Address,
            tokenId,
            chainId,
          }}
        >
          <MomentCommentsProvider>
            <MomentCollectProvider>
              <MomentCollectorsProvider>
                <Moment />
              </MomentCollectorsProvider>
            </MomentCollectProvider>
          </MomentCommentsProvider>
        </MomentProvider>
      </div>
    </main>
  );
};

export default MomentPage;
