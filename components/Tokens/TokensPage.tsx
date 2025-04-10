"use client";

import { useFeedProvider } from "@/providers/FeedProvider";
import FetchMoreInspector from "../FetchMoreInspector";

const TokensPage = () => {
  const { feeds, fetchMore, hasMoreT } = useFeedProvider();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        id="scrollableDiv"
        className="w-1/2 h-[300px] flex flex-col overflow-auto space-y-3"
      >
        {feeds.map((feed, i) => (
          <div key={i} className="border p-2 border-grey">
            Token Info: {feed.collection} - {feed.tokenId}
            <br />
            URI: {feed.uri}
          </div>
        ))}
        <div className="w-full flex justify-center">
          {hasMoreT && (
            <FetchMoreInspector fetchMore={fetchMore} className="size-10" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokensPage;
