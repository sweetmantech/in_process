import React from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { TimelineMoment } from "@/lib/timeline/fetchTimeline";
import { useRouter } from "next/navigation";
import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";

interface FeedProps {
  feed: TimelineMoment;
  index: number;
  handleMouseMove: (event: React.MouseEvent, feed: TimelineMoment) => void;
  handleMouseLeave: () => void;
  spacerWidth: number;
}
const Feed = ({ feed, index, spacerWidth, handleMouseLeave, handleMouseMove }: FeedProps) => {
  const isMobile = useIsMobile();
  const { push } = useRouter();
  const { data } = useMetadata(feed.uri);

  return (
    <React.Fragment>
      {index > 0 && generateSpacer(spacerWidth)}
      <tspan
        onMouseMove={(e) => handleMouseMove(e, feed)}
        onMouseLeave={handleMouseLeave}
        onClick={() => push(`/${feed.admin}`)}
        dominant-baseline="middle"
      >
        <tspan fill="#1B1504" fontSize={isMobile ? 3 : 6} textAnchor="middle">
          ⬤
        </tspan>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {formatFeedText(
          feed.username || truncateAddress(feed.admin),
          (data?.name || "").slice(0, 111),
          Date.parse(feed.createdAt),
          isMobile ? 14 : 20
        )}
      </tspan>
    </React.Fragment>
  );
};

export default Feed;
