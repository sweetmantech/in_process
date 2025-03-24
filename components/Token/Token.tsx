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
          <div className="grow flex flex-col md:flex-row gap-4 md:gap-10">
            {collected ? (
              <MomentCollected />
            ) : (
              <MetaAndComments commentsHidden={isMobile} />
            )}
            <div className="relative w-full aspect-video h-fit">
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
          </div>
          <div className="md:!min-w-[420px]">
            {collected ? <MetaAndComments priceHidden /> : <CollectModal />}
            {!collected && isMobile && <CommentSection />}
          </div>
        </>
      )}
    </>
  );
};

export default Token;
