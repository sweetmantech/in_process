"use client";

import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import Breadcrumbs from "./Breadcrumbs";
import OverviewContent from "./OverviewContent";
import MomentOverviewSkeleton from "./MomentOverviewSkeleton";
import { Address } from "viem";

const MomentOverview = () => {
  const { metadata, isLoading } = useMomentProvider();
  const { data: collection, isLoading: isCollectionLoading } = useCollectionProvider();

  if (isLoading || !metadata || !collection) return <MomentOverviewSkeleton />;

  const collectionHref = `/manage/${networkConfigByChain[collection.chain_id].zoraCollectPathChainName}:${collection.address}`;

  return (
    <div className="w-full px-4 pt-8 md:px-10">
      <Breadcrumbs
        items={[
          {
            label: "collections",
            href: "/manage/moments",
          },
          {
            label: collection.metadata?.name ?? "",
            href: collectionHref,
            isLoading: isCollectionLoading,
          },
          {
            label: metadata?.name ?? "",
            isLoading,
          },
        ]}
      />
      <OverviewContent
        metadata={metadata}
        name={metadata?.name}
        address={collection.address as Address}
      />
    </div>
  );
};

export default MomentOverview;
