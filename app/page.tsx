"use client";

import LandingPage from "@/components/LandingPage/LandingPage";
import FeedProvider from "@/providers/FeedProvider";

const HomePage = () => (
  <FeedProvider>
    <LandingPage />
  </FeedProvider>
);

export default HomePage;
