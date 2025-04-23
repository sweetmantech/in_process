import { useTokenProvider } from "@/providers/TokenProvider";
import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import CommentSection from "./CommentSection";
import truncated from "@/lib/truncated";
import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";

interface MetaAndCommentsProps {
  priceHidden?: boolean;
  commentsHidden?: boolean;
}

const MetaAndComments = ({
  priceHidden = false,
  commentsHidden = false,
}: MetaAndCommentsProps) => {
  const { saleConfig, metadata, comments } = useTokenProvider();
  const { data, isLoading } = saleConfig;
  const { data: meta } = metadata;

  if (!meta) return <Fragment />;

  return (
    <div className="w-full md:max-w-[400px] h-fit">
      {!comments.length && (
        <h3 className="text-2xl md:text-4xl font-spectral pb-2">
          {truncated(meta.name)}
        </h3>
      )}
      <p className="font-spectral">
        {meta.description || (comments.length ? meta.name : "")}
      </p>
      {!priceHidden && (
        <>
          <div className="space-y-1 md:space-y-2 mt-2 md:mt-4">
            <p className="font-archivo text-sm md:text-lg">
              moment collection price
            </p>
            {isLoading ? (
              <Skeleton className="w-full h-6" />
            ) : (
              <p className="w-2/3 md:w-full font-archivo text-sm md:text-base border border-black rounded-md text-center bg-grey-moss-50">
                {data?.pricePerToken === BigInt(0)
                  ? "free"
                  : `${getPrice(data?.pricePerToken || 0, data?.type)} ${getPriceUnit(data?.type || "")}`}
              </p>
            )}
          </div>
        </>
      )}
      {!commentsHidden && <CommentSection />}
    </div>
  );
};

export default MetaAndComments;
