"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import CollectModal from "./CollectModal";
import MetaAndComments from "./MetaAndComments";
import MomentCollected from "./MomentCollected";
import useIsMobile from "@/hooks/useIsMobile";
import CommentSection from "./CommentSection";
import MetadataDisplay from "../MetadataDisplay";
import BackToTimeline from "./BackToTimeline";
import MomentAirdrop from "../MomentAirdrop/MomentAirdrop";
import { useMomentCollectProvider } from "@/providers/MomentCollectProvider";

const Moment = () => {
  const { metadata, isOwner, isSoldOut } = useMomentProvider();
  const { collected } = useMomentCollectProvider();
  const isMobile = useIsMobile();

  return (
    <div className="w-full">
      <BackToTimeline />
      <div className="relative flex flex-col gap-10 px-3 pb-20 md:flex-row md:px-10">
        {metadata && (
          <>
            <div className="flex grow flex-col gap-4 md:flex-row md:gap-10">
              {collected ? <MomentCollected /> : <MetaAndComments commentsHidden={isMobile} />}
              <div className="flex w-full grow justify-center">
                <div className="relative aspect-[576/700] h-fit w-full overflow-hidden font-spectral">
                  <MetadataDisplay />
                </div>
              </div>
            </div>
            <div className="md:!min-w-[420px]">
              {collected ? <MetaAndComments priceHidden /> : <CollectModal />}
              {!collected && isMobile && <CommentSection />}
              {!collected && isOwner && !isSoldOut && <MomentAirdrop />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Moment;
