"use client";

import { useFeedProvider } from "@/providers/FeedProvider";
import InfiniteScroll from "react-infinite-scroll-component";

const TokensPage = () => {
  const { feeds, fetchMore, hasMoreT } = useFeedProvider();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        id="scrollableDiv"
        className="w-1/2 h-[300px] flex flex-col overflow-auto"
      >
        <InfiniteScroll
          dataLength={feeds.length}
          next={() => fetchMore()}
          hasMore={hasMoreT}
          loader={<div>Loading...</div>}
          endMessage={
            <p className="py-4 text-center text-sm">{`That's All!`}</p>
          }
          className="flex flex-col"
          scrollableTarget="scrollableDiv"
        >
          {feeds.map((feed) => (
            <p>
              {feed.collection} - {feed.tokenId}
            </p>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default TokensPage;
