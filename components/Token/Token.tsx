"use client";

import { useTokenProvider } from "@/providers/TokenProvider";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import Image from "next/image";
import CollectModal from "./CollectModal";
import MetaAndComments from "./MetaAndComments";
import MomentCollected from "./MomentCollected";
import useIsMobile from "@/hooks/useIsMobile";
import CommentSection from "./CommentSection";

const Token = () => {
  const { metadata, collected } = useTokenProvider();
  const { data: meta } = metadata;
  const isMobile = useIsMobile();

  return (
    <>
      {meta && (
        <>
          {collected ? (
            <MomentCollected />
          ) : (
            <MetaAndComments commentsHidden={isMobile} />
          )}
          <div className="relative w-full aspect-[1/1]">
            <Image
              src={getFetchableUrl(meta.image) || "/images/placeholder.png"}
              alt="Token Image."
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              blurDataURL={
                getFetchableUrl(meta.image) || "/images/placeholder.png"
              }
              unoptimized
            />
          </div>
          {collected ? <MetaAndComments priceHidden /> : <CollectModal />}
          {!collected && isMobile && <CommentSection />}
        </>
      )}
    </>
  );
};

export default Token;
