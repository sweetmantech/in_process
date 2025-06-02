"use client";

import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";
import useTimeline from "@/hooks/useTimeline";
import { useProfileProvider } from "./ProfileProvider";
import { useCollections } from "@/hooks/useCollections";

const ArtistFeedContext = createContext<
  ReturnType<typeof useFeeds> & {
    isFetchingCollections: boolean;
  }
>(
  {} as ReturnType<typeof useFeeds> & {
    isFetchingCollections: boolean;
  }
);

const ArtistFeedProvider = ({
  children,
  artistAddress,
}: {
  children: React.ReactNode;
  artistAddress: string;
}) => {
  const { hiddenMoments } = useTimeline();
  const { canEdit } = useProfileProvider();
  const collections = useCollections(artistAddress);
  const feeds = useFeeds(collections.collections || []);
  const filtered = canEdit
    ? feeds.feeds
    : feeds.feeds.filter(
        (feed) =>
          !Boolean(
            hiddenMoments.find(
              (moment) =>
                moment.tokenContract.toLowerCase() ===
                  feed.collection.toLowerCase() &&
                moment.tokenId === String(feed.tokenId)
            )
          )
      );
  const value = useMemo(
    () => ({
      ...feeds,
      isFetchingCollections: collections.isFetchingCollections,
      feeds: filtered.sort(
        (a, b) =>
          new Date(b.released_at).getTime() - new Date(a.released_at).getTime()
      ),
    }),
    [feeds]
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
      "useArtistFeedProvider must be used within a ArtistFeedProvider"
    );
  }
  return context;
};

export default ArtistFeedProvider;
