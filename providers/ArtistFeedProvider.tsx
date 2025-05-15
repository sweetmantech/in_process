"use client";

import { useArtistCollections } from "@/hooks/useArtistCollections";
import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";
import useTimeline from "@/hooks/useTimeline";
import { useProfileProvider } from "./ProfileProvider";

const ArtistFeedContext = createContext<ReturnType<typeof useFeeds>>(
  {} as ReturnType<typeof useFeeds>,
);

const ArtistFeedProvider = ({ children }: { children: React.ReactNode }) => {
  const { hiddenMoments } = useTimeline();
  const { canEdit } = useProfileProvider();
  const { data } = useArtistCollections();

  const feeds = useFeeds(data || []);
  const filtered = canEdit
    ? feeds.feeds
    : feeds.feeds.filter(
        (feed) =>
          !Boolean(
            hiddenMoments.find(
              (moment) =>
                moment.tokenContract.toLowerCase() ===
                  feed.collection.toLowerCase() &&
                moment.tokenId === feed.tokenId,
            ),
          ),
      );
  const value = useMemo(
    () => ({
      ...feeds,
      feeds: filtered.sort(
        (a, b) =>
          new Date(b.released_at).getTime() - new Date(a.released_at).getTime(),
      ),
    }),
    [feeds],
  );

  return (
    <ArtistFeedContext.Provider value={value}>
      {children}
    </ArtistFeedContext.Provider>
  );
};

export const useArtistFeedProvider = () => {
  const context = useContext(ArtistFeedContext);
  if (!context) {
    throw new Error(
      "useArtistFeedProvider must be used within a ArtistFeedProvider",
    );
  }
  return context;
};

export default ArtistFeedProvider;
