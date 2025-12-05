import ContentRenderer from "../Renderers";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import CopyButton from "../CopyButton";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useCollectionProvider } from "@/providers/CollectionProvider";

const TokenOverview = () => {
  const { metadata, isLoading } = useMomentProvider();
  const { push } = useRouter();
  const { data: collection } = useCollectionProvider();

  if (isLoading || !metadata || !collection) return <Skeleton className="w-full h-[200px]" />;

  const isPdf = metadata?.content?.mime?.includes("pdf") ?? false;
  const containerClassName = isPdf
    ? "w-fit pt-4 flex flex-col items-center gap-2"
    : "w-fit pt-4 flex flex-col items-center gap-2 md:flex-row";

  return (
    <div className="w-full pt-8 px-4 md:px-10">
      <div className="flex gap-2 text-lg font-archivo items-center cursor-pointer">
        <button
          type="button"
          onClick={() => push("/manage/moments")}
          className="px-2 py-1 rounded-md hover:text-grey-moss-100 hover:text-grey-eggshell hover:bg-black"
        >
          collections
        </button>
        /
        <button
          type="button"
          onClick={() =>
            push(
              `/manage/${networkConfigByChain[collection.chain_id].zoraCollectPathChainName}:${collection.address}`
            )
          }
          className="px-2 py-1 rounded-md hover:text-grey-eggshell hover:bg-black"
        >
          {isLoading ? <Skeleton className="w-12 h-4 rounded-sm" /> : collection.metadata?.name}
        </button>
        /
        <p className="px-2 py-1 rounded-md hover:text-grey-eggshell hover:bg-black">
          {isLoading ? <Skeleton className="w-12 h-4 rounded-sm" /> : metadata?.name}
        </p>
      </div>
      <div className={containerClassName}>
        <div className="w-full md:w-fit md:max-w-[200px] aspect-[1/1] relative">
          {isLoading ? <Skeleton className="size-full" /> : <ContentRenderer metadata={metadata} />}
        </div>
        <div className="space-y-2">
          <p className="font-archivo-medium text-xl md:text-4xl">{metadata?.name}</p>
          <CopyButton address={collection.address} />
        </div>
      </div>
    </div>
  );
};

export default TokenOverview;
