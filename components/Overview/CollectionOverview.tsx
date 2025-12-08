import { useCollectionProvider } from "@/providers/CollectionProvider";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { Address } from "viem";
import Breadcrumbs from "./Breadcrumbs";
import OverviewContent from "./OverviewContent";
import { MomentMetadata } from "@/types/moment";

const CollectionOverview = () => {
  const { data, isLoading } = useCollectionProvider();

  const collectionHref =
    data?.chain_id !== undefined && data?.address
      ? `/manage/${networkConfigByChain[data.chain_id].zoraCollectPathChainName}:${data.address}`
      : undefined;

  return (
    <div className="w-full px-4 pt-8 md:px-10">
      <Breadcrumbs
        items={[
          {
            label: "collections",
            href: "/manage/moments",
          },
          {
            label: data?.name ?? "",
            href: collectionHref,
            isLoading,
          },
        ]}
      />
      <OverviewContent
        metadata={data?.metadata as MomentMetadata}
        name={data?.name}
        address={data?.address as Address}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CollectionOverview;
