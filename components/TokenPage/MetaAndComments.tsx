import { useTokenProvider } from "@/providers/TokenProvider";
import { Fragment, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import CommentSection from "./CommentSection";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import { CopyIcon, DownloadIcon } from "lucide-react";
import useShareMoment from "@/hooks/useShareMoment";
import useBalanceOf from "@/hooks/useBalanceOf";
import useDownload from "@/hooks/useDownload";

interface MetaAndCommentsProps {
  priceHidden?: boolean;
  commentsHidden?: boolean;
}

const MetaAndComments = ({
  priceHidden = false,
  commentsHidden = false,
}: MetaAndCommentsProps) => {
  const { saleConfig, metadata, isLoading, isSetSale } = useTokenProvider();
  const { data: meta } = metadata;
  const { share } = useShareMoment();
  const { balanceOf } = useBalanceOf();
  const { download } = useDownload();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!meta) return <Fragment />;
  
  // Check if description is long enough to warrant truncation
  const shouldTruncateDescription = meta.description && meta.description.length > 150;
  const displayDescription = shouldTruncateDescription && !isDescriptionExpanded 
    ? meta.description.slice(0, 150) + "..." 
    : meta.description;

  return (
    <div className="w-full md:max-w-[400px] h-fit">
      <h3 className="text-4xl md:text-5xl font-spectral pt-2 md:pt-4">
        {meta.name}
      </h3>
      {meta.description && (
        <div className="mt-3 md:mt-4">
          <p className="font-archivo text-sm md:text-base text-grey-moss-300 leading-relaxed whitespace-pre-wrap">
            {displayDescription}
          </p>
          {shouldTruncateDescription && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="mt-2 text-xs md:text-sm font-archivo text-grey-moss-900 hover:text-black transition-colors underline"
            >
              {isDescriptionExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      )}
      {!priceHidden && isSetSale && (
        <>
          <div className="space-y-1 md:space-y-2 mt-2 md:mt-4">
            <p className="font-archivo text-sm md:text-lg">
              moment collection price
            </p>
            {isLoading ? (
              <Skeleton className="w-full h-6" />
            ) : (
              <div className="flex gap-2 items-center">
                <p className="w-2/3 md:w-full font-archivo text-sm md:text-base border border-black rounded-md text-center bg-grey-moss-50">
                  {saleConfig?.pricePerToken === BigInt(0)
                    ? "free"
                    : `${getPrice(saleConfig?.pricePerToken || BigInt(0), saleConfig?.type)} ${getPriceUnit(saleConfig?.type || "")}`}
                </p>
                <button
                  type="button"
                  className="border border-grey-moss-900 bg-white p-1 rounded-sm"
                >
                  <CopyIcon
                    onClick={share}
                    className="size-4 text-grey-moss-900"
                  />
                </button>
                {balanceOf > 0 && (
                  <button
                    type="button"
                    className="border border-grey-moss-900 bg-white p-1 rounded-sm"
                  >
                    <DownloadIcon
                      onClick={download}
                      className="size-4 text-grey-moss-900"
                    />
                  </button>
                )}
              </div>
            )}
          </div>
        </>
      )}
      {!commentsHidden && <CommentSection />}
    </div>
  );
};

export default MetaAndComments;
