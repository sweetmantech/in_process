"use client";

import LandingPage from "@/components/LandingPage/LandingPage";
import { useCollections } from "@/hooks/useCollections";
import FeedProvider from "@/providers/FeedProvider";

const HomePage = () => {
  const { data } = useCollections();

  return (
    <FeedProvider collections={data || []}>
      <LandingPage />
    </FeedProvider>
  );
};

export default HomePage;
