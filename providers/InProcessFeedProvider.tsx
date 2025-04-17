import { useCollections } from "@/hooks/useCollections";
import useFeeds from "@/hooks/useFeeds";
import { createContext, useMemo, useContext } from "react";

const InProcessFeedContext = createContext<ReturnType<typeof useFeeds>>(
  {} as ReturnType<typeof useFeeds>,
);

const InProcessFeedProvider = ({ children }: { children: React.ReactNode }) => {
  const { data } = useCollections();
  const feeds = useFeeds(data || []);

  const value = useMemo(
    () => ({
      ...feeds,
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
