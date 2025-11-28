"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import CollectModal from "./CollectModal";
import MetaAndComments from "./MetaAndComments";
import MomentCollected from "./MomentCollected";
import useIsMobile from "@/hooks/useIsMobile";
import CommentSection from "./CommentSection";
import ContentRenderer from "../Renderers";
import BackToTimeline from "./BackToTimeline";
import MomentAirdrop from "../MomentAirdrop/MomentAirdrop";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";

const Token = () => {
  const { metadata, isOwner } = useMomentProvider();
  const { collected } = useMomentCollectProvider();
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <BackToTimeline />
      <div className="px-3 md:px-10 flex flex-col md:flex-row gap-10 pb-20 relative">
        {metadata && (
          <>
            <div className="grow flex flex-col md:flex-row gap-4 md:gap-10">
              {collected ? <MomentCollected /> : <MetaAndComments commentsHidden={isMobile} />}
              <div className="grow w-full flex justify-center">
                <div className="relative w-full aspect-[576/700] h-fit overflow-hidden font-spectral">
                  <ContentRenderer metadata={metadata} />
                </div>
              </div>
            </div>
            <div className="md:!min-w-[420px]">
              {collected ? <MetaAndComments priceHidden /> : <CollectModal />}
              {!collected && isMobile && <CommentSection />}
              {!collected && isOwner && <MomentAirdrop />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Token;
