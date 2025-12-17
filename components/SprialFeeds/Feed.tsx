import React from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { TimelineMoment } from "@/types/moment";
import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";
import { useMomentNavigation } from "@/hooks/useMomentNavigation";

interface FeedProps {
  feed: TimelineMoment;
  index: number;
  handleMouseMove: (event: React.MouseEvent, feed: TimelineMoment) => void;
  handleMouseLeave: () => void;
  spacerWidth: number;
}
const Feed = ({ feed, index, spacerWidth, handleMouseLeave, handleMouseMove }: FeedProps) => {
  const isMobile = useIsMobile();
  const { data } = useMetadata(feed.uri);
  const { handleMomentClick } = useMomentNavigation(feed);

  return (
    <React.Fragment>
      {index > 0 && generateSpacer(spacerWidth)}
      <tspan
        onMouseMove={(e) => handleMouseMove(e, feed)}
        onMouseLeave={handleMouseLeave}
        onClick={handleMomentClick}
        dominant-baseline="middle"
      >
        <tspan fill="#1B1504" fontSize={isMobile ? 3 : 6} textAnchor="middle">
          ⬤
        </tspan>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {formatFeedText(
          feed.default_admin.username || truncateAddress(feed.default_admin.address),
          (data?.name || "").slice(0, 111),
          Date.parse(feed.created_at),
          isMobile ? 14 : 20
        )}
      </tspan>
    </React.Fragment>
  );
};

export default Feed;
