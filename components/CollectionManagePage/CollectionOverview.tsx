import ContentRenderer from "../Renderers";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { MomentMetadata } from "@/types/moment";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import CopyButton from "../CopyButton";

const CollectionOverview = () => {
  const { collection } = useCollectionProvider();
  const { data, isLoading } = collection.metadata;
  const { push } = useRouter();

  const isPdf = data?.content?.mime?.includes("pdf") ?? false;
  const containerClassName = isPdf
    ? "w-fit pt-4 flex flex-col items-center gap-2"
    : "w-fit pt-4 flex flex-col md:flex-row items-center gap-2";

  return (
    <div className="w-full px-4 pt-8 md:px-10">
      <div className="flex cursor-pointer items-center gap-2 font-archivo text-lg">
        <button
          type="button"
          onClick={() => push("/manage/moments")}
          className="rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell hover:text-grey-moss-100"
        >
          collections
        </button>
        /
        <button
          type="button"
          onClick={() =>
            push(
              `/manage/${networkConfigByChain[collection.chainId].zoraCollectPathChainName}:${collection.address}`
            )
          }
          className="rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell"
        >
          {isLoading ? <Skeleton className="h-4 w-12 rounded-sm" /> : data?.name}
        </button>
      </div>
      <div className={containerClassName}>
        <div className="relative aspect-[1/1] w-full md:w-fit md:max-w-[200px]">
          {isLoading ? (
            <Skeleton className="size-full" />
          ) : (
            <ContentRenderer metadata={data as MomentMetadata} />
          )}
        </div>
        <div className="space-y-2">
          <p className="font-archivo-medium text-xl md:text-4xl">{data?.name}</p>
          <CopyButton address={collection.address} />
        </div>
      </div>
    </div>
  );
};

export default CollectionOverview;
