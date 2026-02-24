import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";
import { useParams, usePathname, useRouter } from "next/navigation";
import truncated from "@/lib/truncated";
import HideButton from "@/components/TimelineMoments/HideButton";
import { type TimelineMoment } from "@/types/moment";
import MomentItemSkeleton from "./MomentItemSkeleton";
import { Copy, Check } from "lucide-react";
import Preview from "./Preview";
import useCopy from "@/hooks/useCopy";
import useIsMomentAdmin from "@/hooks/useIsMomentAdmin";

export type MomentItemVariant = "collection" | "moment";

interface MomentItemProps {
  m: TimelineMoment;
  variant?: MomentItemVariant;
}

const MomentItem = ({ m, variant = "collection" }: MomentItemProps) => {
  const { data, isLoading } = useMetadata(m.uri);
  const { push } = useRouter();
  const { copied, copy } = useCopy(m.address);
  const isMomentAdmin = useIsMomentAdmin(m);
  const pathname = usePathname();
  const isManagePage = pathname.includes("/manage");

  const handleClick = () => {
    if (isLoading) return;
    push(
      `/${isManagePage ? "manage" : "collect"}/${m.chain_id === 8453 ? "base" : "bsep"}:${m.address}${variant === "moment" ? `/${m.token_id}` : ""}`
    );
  };

  if (isLoading) return <MomentItemSkeleton />;
  return (
    <div
      role="button"
      tabIndex={0}
      className="group col-span-1 w-full h-fit cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-grey-moss-50">
        {isMomentAdmin && (
          <div className="absolute right-1.5 top-1.5 z-20">
            <HideButton moment={m} />
          </div>
        )}
        {data ? (
          <Preview data={data} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="font-archivo text-sm text-grey-moss-200">No Preview</p>
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between gap-2">
          <p
            className={`truncate font-archivo-medium text-sm ${data ? "text-grey-moss-900" : "text-grey-moss-200"}`}
          >
            {data ? truncated(data.name ?? "", 20) : "Unknown"}
          </p>
          <span className="shrink-0 font-archivo text-xs text-grey-moss-200">
            {new Date(m.created_at).toLocaleDateString("en-US")}
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between gap-2 font-archivo text-xs text-grey-moss-200">
          <button
            type="button"
            onClick={copy}
            className="flex items-center gap-1 truncate transition-colors hover:text-grey-moss-400"
          >
            <span className="truncate">{truncateAddress(m.address)}</span>
            {copied ? (
              <Check className="size-3 shrink-0 text-green-500" />
            ) : (
              <Copy className="size-3 shrink-0" />
            )}
          </button>
          <span className="shrink-0">#{m.token_id}</span>
        </div>
      </div>
    </div>
  );
};

export default MomentItem;
