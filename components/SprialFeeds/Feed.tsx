import React, { memo, useCallback } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { TimelineMoment } from "@/types/moment";
import truncateAddress from "@/lib/truncateAddress";
import { useMomentClick } from "@/hooks/useMomentClick";

interface FeedProps {
  feed: TimelineMoment;
  index: number;
  handleMouseMove: (event: React.MouseEvent, feed: TimelineMoment) => void;
  handleMouseLeave: () => void;
  spacerWidth: number;
}

const Feed = memo(({ feed, index, spacerWidth, handleMouseLeave, handleMouseMove }: FeedProps) => {
  const isMobile = useIsMobile();
  const { handleMomentClick, data } = useMomentClick(feed);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => handleMouseMove(e, feed),
    [handleMouseMove, feed]
  );

  return (
    <React.Fragment>
      {index > 0 && generateSpacer(spacerWidth)}
      <tspan
        onMouseMove={onMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleMomentClick}
        dominantBaseline="middle"
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
});

Feed.displayName = "Feed";

export default Feed;
