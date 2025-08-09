"use client";

import { useTokenProvider } from "@/providers/TokenProvider";
import CollectModal from "./CollectModal";
import MetaAndComments from "./MetaAndComments";
import MomentCollected from "./MomentCollected";
import useIsMobile from "@/hooks/useIsMobile";
import CommentSection from "./CommentSection";
import ContentRenderer from "../Renderers";
import BackToTimeline from "./BackToTimeline";

const Token = () => {
  const { metadata, collected } = useTokenProvider();
  const { data: meta } = metadata;
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <div className="px-3 md:px-10 flex flex-col md:flex-row gap-10 pb-20 relative">
        {meta && (
          <>
            <div className="grow flex flex-col md:flex-row gap-4 md:gap-10">
              {collected ? (
                <div className="w-full md:max-w-[400px]">
                  <BackToTimeline />
                  <MomentCollected />
                </div>
              ) : (
                <div className="w-full md:max-w-[400px]">
                  <BackToTimeline />
                  <MetaAndComments commentsHidden={isMobile} />
                </div>
              )}
              <div className="grow w-full flex justify-center">
                <div className="relative w-full aspect-[576/700] h-fit overflow-hidden font-spectral">
                  <ContentRenderer metadata={meta} />
                </div>
              </div>
            </div>
            <div className="md:!min-w-[420px]">
              {collected ? <MetaAndComments priceHidden /> : <CollectModal />}
              {!collected && isMobile && <CommentSection />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Token;
