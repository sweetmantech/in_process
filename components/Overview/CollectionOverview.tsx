"use client";

import { useCollectionProvider } from "@/providers/CollectionProvider";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { SITE_ORIGINAL_URL } from "@/lib/consts";
import { getCollectionTimelineUrl } from "@/lib/collection/getCollectionTimelineUrl";
import { Address } from "viem";
import Breadcrumbs from "./Breadcrumbs";
import OverviewContent from "./OverviewContent";
import CollectionOverviewSkeleton from "./CollectionOverviewSkeleton";
import CopyButton from "../CopyButton";

const CollectionOverview = () => {
  const { data, isLoading } = useCollectionProvider();
  const metadata = data?.metadata;
  const name = data?.name;
  const address = data?.address as Address;

  const collectionHref =
    data?.chain_id !== undefined && data?.address
      ? `/manage/${networkConfigByChain[data.chain_id].zoraCollectPathChainName}:${data.address}`
      : undefined;

  const timelineUrl = getCollectionTimelineUrl(data?.chain_id, data?.address, SITE_ORIGINAL_URL);

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
          },
        ]}
      />
      <OverviewContent metadata={metadata} name={name} address={address as Address} />
      {timelineUrl && (
        <CopyButton
          text={timelineUrl}
          shorten={false}
          className="mt-2 bg-grey-moss-50 px-3 py-1 text-xs text-grey-moss-200 hover:text-grey-moss-400"
        >
          collection timeline
        </CopyButton>
      )}
    </div>
  );
};

export default CollectionOverview;
