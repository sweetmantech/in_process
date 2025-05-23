import ContentRenderer from "../Renderers";
import truncateAddress from "@/lib/truncateAddress";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Metadata } from "@/types/token";
import { networkConfigByChain } from "@/lib/protocolSdk/apis/chain-constants";
import { toast } from "sonner";
import { Copy } from "lucide-react";

const Overview = () => {
  const { collection } = useCollectionProvider();
  const { data, isLoading } = collection.metadata;
  const { push } = useRouter();

  return (
    <div className="w-screen pt-8 px-4 md:px-10">
      <div className="flex gap-2 text-lg font-archivo items-center cursor-pointer">
        <button
          type="button"
          onClick={() => push("/manage")}
          className="px-2 py-1 rounded-md hover:text-grey-moss-100 hover:text-grey-eggshell hover:bg-black"
        >
          collections
        </button>
        /
        <button
          type="button"
          onClick={() =>
            push(
              `/manage/${networkConfigByChain[collection.chainId].zoraCollectPathChainName}:${collection.address}`,
            )
          }
          className="px-2 py-1 rounded-md hover:text-grey-eggshell hover:bg-black"
        >
          {isLoading ? (
            <Skeleton className="w-12 h-4 rounded-sm" />
          ) : (
            data?.name
          )}
        </button>
      </div>
      <div className="w-fit pt-4 flex flex-col md:flex-row items-center gap-2">
        <div className="w-full md:w-fit md:max-w-[200px] aspect-[1/1] relative">
          {isLoading ? (
            <Skeleton className="size-full" />
          ) : (
            <ContentRenderer metadata={data as Metadata} />
          )}
        </div>
        <div className="space-y-2">
          <p className="font-archivo-medium text-xl md:text-4xl">
            {data?.name}
          </p>
          <button
            className="flex gap-2 items-center font-archivo bg-grey-moss-200 text-grey-eggshell hover:text-tan-primary w-fit px-3 py-1 rounded-md"
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(collection.address);
              toast.success("copied!");
            }}
          >
            {truncateAddress(collection.address)}
            <Copy className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;
