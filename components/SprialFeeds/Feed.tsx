import React, { useEffect, useState } from "react";
import useIsMobile from "@/hooks/useIsMobile";
import { formatFeedText, generateSpacer } from "@/lib/spiralUtils";
import { Collection } from "@/types/token";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

interface FeedProps {
  feed: Collection;
  index: number;
  handleMouseMove: (event: React.MouseEvent, feed: Collection) => void;
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

  useEffect(() => {
    const fetchProfile = async () => {
      if (intialized) return;
      if (inView) {
        setInitialized(true);
        const response = await fetch(
          `/api/profile?walletAddress=${feed.defaultAdmin}`,
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
        onClick={() => push(`/${feed.defaultAdmin}`)}
        ref={ref}
      >
        {formatFeedText(username, feed, isMobile ? 14 : 20)}
      </tspan>
    </React.Fragment>
  );
};

export default Feed;
