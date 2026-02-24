"use client";

import { useCollectionProvider } from "@/providers/CollectionProvider";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { Address } from "viem";
import Breadcrumbs from "./Breadcrumbs";
import OverviewContent from "./OverviewContent";
import CollectionOverviewSkeleton from "./CollectionOverviewSkeleton";

const CollectionOverview = () => {
  const { data, isLoading } = useCollectionProvider();
  const metadata = data?.metadata;
  const name = data?.name;
  const address = data?.address as Address;

  const collectionHref =
    data?.chain_id !== undefined && data?.address
      ? `/manage/${networkConfigByChain[data.chain_id].zoraCollectPathChainName}:${data.address}`
      : undefined;

  if (isLoading) return <CollectionOverviewSkeleton />;

  return (
    <div className="w-full px-2 pt-0 md:pt-8 md:px-10">
      <Breadcrumbs
        items={[
          {
            label: "collections",
            href: "/manage/moments",
          },
          {
            label: metadata ? (
              (data?.name ?? "")
            ) : (
              <span className="text-grey-moss-200">unknown</span>
            ),
            href: collectionHref,
            isLoading,
          },
        ]}
      />
      <OverviewContent metadata={metadata} name={name} address={address as Address} />
    </div>
  );
};

export default CollectionOverview;
