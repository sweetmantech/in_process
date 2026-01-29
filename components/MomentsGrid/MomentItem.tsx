import { useMetadata } from "@/hooks/useMetadata";
import Image from "next/image";
import truncateAddress from "@/lib/truncateAddress";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { useRouter } from "next/navigation";
import truncated from "@/lib/truncated";
import HideButton from "@/components/TimelineMoments/HideButton";
import { type TimelineMoment } from "@/types/moment";
import MomentItemSkeleton from "./MomentItemSkeleton";
import { Copy, Check } from "lucide-react";
import useCopy from "@/hooks/useCopy";

export type MomentItemVariant = "collection" | "moment";

interface MomentItemProps {
  m: TimelineMoment;
  variant?: MomentItemVariant;
}

const MomentItem = ({ m, variant = "collection" }: MomentItemProps) => {
  const { data, isLoading } = useMetadata(m.uri);
  const { push } = useRouter();
  const { copied, copy } = useCopy(m.address);

  const handleClick = () => {
    if (isLoading) return;
    push(
      `/manage/${m.chain_id === 8453 ? "base" : "bsep"}:${m.address}${variant === "moment" ? `/${m.token_id}` : ""}`
    );
  };

  if (isLoading) return <MomentItemSkeleton />;
  if (data)
    return (
      <div
        role="button"
        tabIndex={0}
        className="group col-span-1 w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-t-xl bg-grey-moss-50">
          <div className="absolute right-1.5 top-1.5 z-20">
            <HideButton moment={m} />
          </div>
          <Image
            src={getFetchableUrl(data.image) || "/images/placeholder.png"}
            alt={data?.name || "Moment image"}
            unoptimized
            className="z-[1] transition-transform duration-300 group-hover:scale-[1.02]"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <div className="p-2">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-archivo-medium text-sm text-grey-moss-900">
              {truncated(`${data?.name}`, 20)}
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
