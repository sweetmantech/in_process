"use client";

import OnBoardingPage from "@/components/OnBoardingPage";
import { useCollections } from "@/hooks/useCollections";
import FeedProvider from "@/providers/FeedProvider";

const OnBoarding = () => {
  const { data } = useCollections();
  return (
    <FeedProvider collections={data || []}>
      <OnBoardingPage />
    </FeedProvider>
  );
};

export default OnBoarding;
