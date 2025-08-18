import React from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { Token } from "@/types/token";
import { useRouter } from "next/navigation";
import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

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

  const handleClick = () => {
    if (data?.external_url) {
      const newWindow = window.open(data.external_url, "_blank");
      if (newWindow) {
        newWindow.opener = null;
      }
      return;
    }
    const shortNetworkName = getShortNetworkName(
      feed.chain.replaceAll("_", " ")
    );
    const tokenId = feed.tokenId == "0" ? 1 : feed.tokenId;
    push(`/collect/${shortNetworkName}:${feed.collection}/${tokenId}`);
  };

  return (
    <React.Fragment>
      {index > 0 && generateSpacer(spacerWidth)}
      <tspan
        onMouseMove={(e) => handleMouseMove(e, feed)}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        dominant-baseline="middle"
      >
        <tspan fill="#1B1504" fontSize={isMobile ? 3 : 6} textAnchor="middle">
          ⬤
        </tspan>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {formatFeedText(
          feed.username || truncateAddress(feed.creator),
          (data?.name || "").slice(0, 111),
          feed.released_at,
          isMobile ? 14 : 20
        )}
      </tspan>
    </React.Fragment>
  );
};

export default Feed;
