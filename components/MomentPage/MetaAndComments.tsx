import { useMomentProvider } from "@/providers/MomentProvider";
import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import CommentSection from "./CommentSection";
import Description from "./Description";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import { DownloadIcon } from "lucide-react";
import useBalanceOf from "@/hooks/useBalanceOf";
import useDownload from "@/hooks/useDownload";
import ShareButton from "./ShareButton";

interface MetaAndCommentsProps {
  priceHidden?: boolean;
  commentsHidden?: boolean;
}

const MetaAndComments = ({ priceHidden = false, commentsHidden = false }: MetaAndCommentsProps) => {
  const { saleConfig, metadata, isLoading, isSetSale } = useMomentProvider();
  const { balanceOf } = useBalanceOf();
  const { download } = useDownload();

  if (!metadata) return <Fragment />;

  return (
    <div className="h-fit w-full md:max-w-[400px]">
      <h3 className="font-spectral text-4xl md:text-5xl">
        {metadata.name.length > 30 ? `${metadata.name.slice(0, 30)}...` : metadata.name}
      </h3>
      <Description description={metadata.description || ""} />
      {!priceHidden && isSetSale && (
        <>
          <div className="mt-2 space-y-1 md:mt-4 md:space-y-2">
            <p className="font-archivo text-sm md:text-lg">moment collection price</p>
            {isLoading ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              <div className="flex items-center gap-2">
                <p className="w-2/3 rounded-md border border-black bg-grey-moss-50 text-center font-archivo text-sm md:w-full md:text-base">
                  {BigInt(saleConfig?.pricePerToken) === BigInt(0)
                    ? "free"
                    : `${getPrice(saleConfig?.pricePerToken || BigInt(0), saleConfig?.type)} ${getPriceUnit(saleConfig?.type || "")}`}
                </p>
                <ShareButton />
                {balanceOf > 0 && (
                  <button
                    type="button"
                    className="rounded-sm border border-grey-moss-900 bg-white p-1"
                  >
                    <DownloadIcon onClick={download} className="size-4 text-grey-moss-900" />
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
