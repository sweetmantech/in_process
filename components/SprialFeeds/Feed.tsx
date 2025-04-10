import React, { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { Token } from "@/types/token";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useMetadata } from "@/hooks/useMetadata";
import truncateAddress from "@/lib/truncateAddress";

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
  const [ref, inView] = useInView();
  const [intialized, setInitialized] = useState(false);
  const [username, setUserName] = useState("");
  const { data } = useMetadata(feed.uri);

  useEffect(() => {
    const fetchProfile = async () => {
      if (intialized) return;
      if (inView) {
        setInitialized(true);
        const response = await fetch(
          `/api/profile?walletAddress=${feed.creator}`,
        );
        const data = await response.json();
        setUserName(data.username);
        return;
      }
      setUserName("");
    };
    fetchProfile();
    // eslint-disable-next-line
  }, [inView, intialized]);

  return (
    <React.Fragment>
      {index > 0 && generateSpacer(spacerWidth)}
      <tspan
        onMouseMove={(e) => handleMouseMove(e, feed)}
        onMouseLeave={handleMouseLeave}
        onClick={() => push(`/${feed.creator}`)}
        ref={ref}
      >
        <tspan fill="#810505" fontSize={28}>
          ⟡
        </tspan>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {formatFeedText(
          username || truncateAddress(feed.creator),
          data?.name || "",
          feed.released_at,
          isMobile ? 14 : 20,
        )}
      </tspan>
    </React.Fragment>
  );
};

export default Feed;
