"use client";

import TokensPage from "@/components/Tokens/TokensPage";
import FeedProvider from "@/providers/FeedProvider";

const Feeds = () => (
  <FeedProvider>
    <TokensPage />
  </FeedProvider>
);

export default Feeds;
