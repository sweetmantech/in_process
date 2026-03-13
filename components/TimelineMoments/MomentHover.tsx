import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import ContentRenderer from "../Renderers/ContentRenderer";
import { TokenMetadataJson } from "@/lib/protocolSdk";

interface MomentHoverProps {
  isLoading: boolean;
  data: TokenMetadataJson;
}

const MomentHover: FC<MomentHoverProps> = ({ isLoading, data }) => {
  return (
    <div className="relative -translate-x-1/2" data-video-hover-area="true">
      <div className="absolute inset-0 z-0 -m-8" />

      <div className="relative z-10 shadow-lg transition-opacity duration-200 ease-out">
        <div className="relative aspect-[360/248] w-[200px] overflow-hidden bg-grey-moss-100 !font-spectral md:w-[300px]">
          {isLoading ? <Skeleton className="size-full" /> : <ContentRenderer metadata={data} />}
        </div>
      </div>
    </div>
  );
};

export default MomentHover;
