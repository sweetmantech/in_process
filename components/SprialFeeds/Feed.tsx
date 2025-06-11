import React from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { Token } from "@/types/token";
import { useRouter } from "next/navigation";
import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";
import { useInProcessProvider } from "@/providers/InProcessProvider";

interface FeedProps {
  feed: Token;
  index: number;
  handleMouseMove: (event: React.MouseEvent, feed: Token) => void;
  handleMouseLeave: () => void;
  spacerWidth: number;
}
const Feed = ({
  feed,
  index,
  spacerWidth,
  handleMouseLeave,
  handleMouseMove,
}: FeedProps) => {
  const isMobile = useIsMobile();
  const { push } = useRouter();
  const { data } = useMetadata(feed.uri);
  const { profiles } = useInProcessProvider();

  return (
    <React.Fragment>
      {index > 0 && generateSpacer(spacerWidth)}
      <tspan
        onMouseMove={(e) => handleMouseMove(e, feed)}
        onMouseLeave={handleMouseLeave}
        onClick={() => push(`/${feed.creator}`)}
      >
        <tspan fill="#4E4E4E" fontSize={20}>
          ⬤
        </tspan>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {formatFeedText(
          profiles[`${feed.creator}`]?.username ||
            feed.username ||
            truncateAddress(feed.creator),
          (data?.name || "").slice(0, 111),
          feed.released_at,
          isMobile ? 14 : 20
        )}
      </tspan>
    </React.Fragment>
  );
};

export default Feed;
