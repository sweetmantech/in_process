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
              `/manage/${networkConfigByChain[collection.chain_id].zoraCollectPathChainName}:${collection.address}`
            )
          }
          className="rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell"
        >
          {isLoading ? <Skeleton className="w-12 h-4 rounded-sm" /> : collection.metadata?.name}
        </button>
        /
        <p className="rounded-md px-2 py-1 hover:bg-black hover:text-grey-eggshell">
          {isLoading ? <Skeleton className="h-4 w-12 rounded-sm" /> : metadata?.name}
        </p>
      </div>
      <div className={containerClassName}>
        <div className="relative aspect-[1/1] w-full md:w-fit md:max-w-[200px]">
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
