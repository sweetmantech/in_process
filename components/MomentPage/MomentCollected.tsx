"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import ContentRenderer from "../Renderers";
import Title from "./Title";
import Description from "./Description";
import Comments from "./Comments";
import Collectors from "./Collectors";
import CollectedButtons from "./CollectedButtons";

const MomentCollected = () => {
  const { metadata, fetchMomentData } = useMomentProvider();

  if (!metadata) return null;

  return (
    <>
      <div className="flex grow flex-col gap-4 md:flex-row md:gap-10">
        <div className="h-fit w-full md:max-w-[400px]">
          <p className="pb-4 font-archivo-medium text-5xl">moment created</p>
          <CollectedButtons />
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
        <div className="h-fit w-full md:max-w-[400px]">
          <Title />
          <Description />
          <Comments />
        </div>
        <Collectors />
      </div>
    </>
  );
};

export default MomentCollected;
