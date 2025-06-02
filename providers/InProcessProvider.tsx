import { useCollections } from "@/hooks/useCollections";
import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";
import { useTimelineProvider } from "./TimelineProvider";
import useProfiles from "@/hooks/useProfiles";

const InProcessContext = createContext<
  ReturnType<typeof useFeeds> &
    ReturnType<typeof useCollections> &
    ReturnType<typeof useProfiles>
>(
  {} as ReturnType<typeof useFeeds> &
    ReturnType<typeof useCollections> &
    ReturnType<typeof useProfiles>
);

const InProcessProvider = ({ children }: { children: React.ReactNode }) => {
  const collections = useCollections();
  const feeds = useFeeds(collections.collections);
  const { hiddenMoments } = useTimelineProvider();
  const profiles = useProfiles(collections.collections);

  const value = useMemo(
    () => ({
      ...collections,
      ...feeds,
      ...profiles,
      feeds: feeds.feeds
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .filter(
          (feed) =>
            !Boolean(
              hiddenMoments.find(
                (moment) =>
                  moment.tokenContract.toLowerCase() ===
                    feed.collection.toLowerCase() &&
                  moment.tokenId === String(feed.tokenId)
              )
            )
        ),
    }),
    [feeds]
  );

  return (
    <InProcessContext.Provider value={value}>
      {children}
    </InProcessContext.Provider>
  );
};

export const useInProcessProvider = () => {
  const context = useContext(InProcessContext);
  if (!context) {
    throw new Error(
      "useInProcessProvider must be used within a InProcessProvider"
    );
  }
  return context;
};

export default InProcessProvider;
