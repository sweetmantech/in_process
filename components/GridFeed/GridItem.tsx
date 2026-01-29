import { TimelineMoment } from "@/types/moment";
import ContentRenderer from "../Renderers";
import { useMomentClick } from "@/hooks/useMomentClick";
import truncateAddress from "@/lib/truncateAddress";
import truncated from "@/lib/truncated";
import useCopy from "@/hooks/useCopy";
import { Copy, Check } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import HideButton from "../TimelineMoments/HideButton";

interface GridItemProps {
  feed: TimelineMoment;
}

const GridItem = ({ feed }: GridItemProps) => {
  const { handleMomentClick, isLoading, data } = useMomentClick(feed);
  const { copied, copy } = useCopy(feed.address);

  if (isLoading || !data) {
    return (
      <div className="col-span-1 w-full overflow-hidden rounded-xl bg-white shadow-sm">
        <Skeleton className="aspect-square w-full rounded-none bg-grey-moss-50" />
        <div className="p-2">
          <Skeleton className="h-4 w-3/4 bg-grey-moss-100" />
          <Skeleton className="mt-1 h-3 w-1/2 bg-grey-moss-100" />
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleMomentClick}
      onKeyDown={(e) => e.key === "Enter" && handleMomentClick()}
      className="group col-span-1 w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-grey-moss-50">
        <div className="absolute right-1.5 top-1.5 z-20">
          <HideButton moment={feed} />
        </div>
        <ContentRenderer metadata={data} />
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-archivo-medium text-sm text-grey-moss-900">
            {truncated(data?.name, 20)}
          </p>
          <span className="shrink-0 font-archivo text-xs text-grey-moss-200">
            {new Date(feed.created_at).toLocaleDateString("en-US")}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2 font-archivo text-xs text-grey-moss-200">
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1 truncate transition-colors hover:text-grey-moss-400"
          >
            <span className="truncate">{truncateAddress(feed.address)}</span>
            {copied ? (
              <Check className="size-3 shrink-0 text-green-500" />
            ) : (
              <Copy className="size-3 shrink-0" />
            )}
          </button>
          <span className="shrink-0">#{feed.token_id}</span>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
