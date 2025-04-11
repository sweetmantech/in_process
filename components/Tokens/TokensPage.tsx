"use client";

import { useInProcessFeedProvider } from "@/providers/InProcessFeedProvider";
import FetchMoreInspector from "../FetchMoreInspector";
import Loading from "../Loading";

const TokensPage = () => {
  const { feeds, fetchMore, hasMoreT } = useInProcessFeedProvider();

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
            <FetchMoreInspector fetchMore={fetchMore}>
              <Loading className="size-10" />
            </FetchMoreInspector>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokensPage;
