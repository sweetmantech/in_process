"use client";

import { FadeIn } from "@/components/ui/fade-in";
import BgNoiseWrapper from "@/components/ui/texture-wrapper";
import Feed from "./Feed";
import LayoutToggle from "./LayoutToggle";
import { useState } from "react";

export default function LandingPage() {
  const [selectedLayout, setSelectedLayout] = useState<
    "horizontal" | "vertical"
  >("horizontal");

  return (
    <div className="isolate min-h-screen overflow-hidden bg-white bg-gradientTopRightLight pb-8 sm:pb-12 md:pb-0">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        <div className="max-w-4xl mx-auto relative pt-12 overflow-hidden min-h-screen flex flex-col">
          <LayoutToggle
            selectedLayout={selectedLayout}
            setSelectedLayout={setSelectedLayout}
          />
          <FadeIn className="w-full grow flex items-center justify-center pb-20">
            <Feed layout={selectedLayout} />
          </FadeIn>
        </div>
      </BgNoiseWrapper>
    </div>
  );
}
LandingPage.theme = "light";
