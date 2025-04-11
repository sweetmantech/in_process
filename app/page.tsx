"use client";

import LandingPage from "@/components/LandingPage/LandingPage";
import useCheckSign from "@/hooks/useCheckSign";

const HomePage = () => {
  useCheckSign();

  return <LandingPage />;
};

export default HomePage;
