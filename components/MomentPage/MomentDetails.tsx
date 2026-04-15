"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import useIsMobile from "@/hooks/useIsMobile";
import CollectModal from "./CollectModal";
import Comments from "./Comments";
import Title from "./Title";
import Description from "./Description";
import Price from "./Price";
import DetailButtons from "./DetailButtons";
import MomentAirdrop from "../MomentAirdrop/MomentAirdrop";
import Collectors from "./Collectors";
import ContentRenderer from "../Renderers";
import { useUserProvider } from "@/providers/UserProvider";

const MomentDetails = () => {
  const { metadata, fetchMomentData } = useMomentProvider();
  const isMobile = useIsMobile();
  const { isFarcasterMiniApp } = useUserProvider();
  if (!metadata) return null;

  return (
    <>
      <div className="flex grow flex-col gap-4 md:flex-row md:gap-10">
        <div className="h-fit w-full md:max-w-[400px]">
          <Title />
          <Description />
          <Price />
          <DetailButtons />
          {!isMobile && <Comments />}
        </div>
        <div className="flex w-full grow justify-center">
          <div className="relative aspect-[576/700] h-fit w-full overflow-hidden font-spectral">
            <ContentRenderer
              metadata={metadata}
              onRefresh={async () => {
                const result = await fetchMomentData();
                return result.data?.metadata?.animation_url;
              }}
            />
          </div>
        </div>
      </div>
      <div className="md:!min-w-[420px]">
        <CollectModal />
        {isMobile && <Comments />}
        {!isFarcasterMiniApp && <MomentAirdrop />}
        <Collectors />
      </div>
    </>
  );
};

export default MomentDetails;
