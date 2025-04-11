import { useArtistCollections } from "@/hooks/useArtistCollections";
import { useCollections } from "@/hooks/useCollections";
import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";

const ArtistFeedContext = createContext<ReturnType<typeof useFeeds>>(
  {} as ReturnType<typeof useFeeds>,
);

const ArtistFeedProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useArtistCollections();
  const feeds = useFeeds(data || []);

  const value = useMemo(
    () => ({
      ...feeds,
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
