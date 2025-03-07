import { useTokenProvider } from "@/providers/TokenProvider";
import { Fragment } from "react";
import { Skeleton } from "../ui/skeleton";
import { formatEther } from "viem";
import CommentSection from "./CommentSection";

interface MetaAndCommentsProps {
  priceHidden?: boolean;
}

const MetaAndComments = ({ priceHidden = false }: MetaAndCommentsProps) => {
  const { saleConfig, metadata } = useTokenProvider();
  const { data, isLoading } = saleConfig;
  const { data: meta } = metadata;

  if (!meta) return <Fragment />;

  return (
    <div>
      <h3 className="text-5xl font-archivo">{meta.name}</h3>
      <h3 className="text-xl font-spectral pt-4">{meta.description}</h3>

      {!priceHidden && (
        <>
          <div className="space-y-2 mt-4">
            <p className="font-archivo text-lg">moment collection price</p>
            {isLoading ? (
              <Skeleton className="w-full h-6" />
            ) : (
              <p className="font-archivo text-base border border-black rounded-md text-center bg-tan-secondary">
                {formatEther(BigInt(data?.pricePerToken || 0))} eth
              </p>
            )}
          </div>
        </>
      )}
      <CommentSection />
    </div>
  );
};

export default MetaAndComments;
