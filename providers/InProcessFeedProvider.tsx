import { useCollections } from "@/hooks/useCollections";
import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";
import { useTimelineProvider } from "./TimelineProvider";

const InProcessFeedContext = createContext<
  ReturnType<typeof useFeeds> & ReturnType<typeof useCollections>
>({} as ReturnType<typeof useFeeds> & ReturnType<typeof useCollections>);

const InProcessFeedProvider = ({ children }: { children: React.ReactNode }) => {
  const collections = useCollections();
  const feeds = useFeeds(collections.collections);
  const { hiddenMoments } = useTimelineProvider();

  const value = useMemo(
    () => ({
      ...collections,
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
