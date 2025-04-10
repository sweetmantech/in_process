import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";

const FeedContext = createContext<ReturnType<typeof useFeeds>>(
  {} as ReturnType<typeof useFeeds>,
);

const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  const feeds = useFeeds();

  const value = useMemo(
    () => ({
      ...feeds,
    }),
    [feeds],
  );

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

export const useFeedProvider = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeedProvider must be used within a FeedProvider");
  }
  return context;
};

export default FeedProvider;
