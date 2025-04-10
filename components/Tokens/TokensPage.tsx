"use client";

import { useFeedProvider } from "@/providers/FeedProvider";
import InfiniteScroll from "react-infinite-scroll-component";

const TokensPage = () => {
  const { feeds, fetchMore, hasMoreT } = useFeedProvider();

  return (
    <div id="feed-container" className="size-full px-6 mt-4 space-y-6">
      <InfiniteScroll
        dataLength={feeds.length}
        next={() => fetchMore(feeds.length)}
        hasMore={hasMoreT}
        loader={<div>Loading...</div>}
        endMessage={<p className="py-4 text-center text-sm">{`That's All!`}</p>}
        className="!overflow-y-hidden"
        scrollableTarget="feed-container"
      >
        <div className="max-w-full grow space-y-6">
          {feeds.map((feed) => (
            <p>
              {feed.collection} - {feed.tokenId}
            </p>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default TokensPage;
