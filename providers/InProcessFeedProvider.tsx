import { useCollections } from "@/hooks/useCollections";
import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";
import { useTimelineProvider } from "./TimelineProvider";

const InProcessFeedContext = createContext<ReturnType<typeof useFeeds>>(
  {} as ReturnType<typeof useFeeds>,
);

const InProcessFeedProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useCollections();
  const feeds = useFeeds(data?.pages?.[0].collections || []);
  const { hiddenMoments } = useTimelineProvider();

  const value = useMemo(
    () => ({
      ...feeds,
      feeds: feeds.feeds
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .filter(
          (feed) =>
            !Boolean(
              hiddenMoments.find(
                (moment) =>
                  moment.tokenContract.toLowerCase() ===
                    feed.collection.toLowerCase() &&
                  moment.tokenId === feed.tokenId,
              ),
            ),
        ),
    }),
    [feeds],
  );

  return (
    <InProcessFeedContext.Provider value={value}>
      {children}
    </InProcessFeedContext.Provider>
  );
};

export const useInProcessFeedProvider = () => {
  const context = useContext(InProcessFeedContext);
  if (!context) {
    throw new Error(
      "useInProcessFeedProvider must be used within a InProcessFeedProvider",
    );
  }
  return context;
};

export default InProcessFeedProvider;
