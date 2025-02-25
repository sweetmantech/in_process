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
    <div className="isolate min-h-screen overflow-hidden bg-white bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        <div className="mx-10 relative overflow-hidden min-h-screen flex flex-col">
          <LayoutToggle
            selectedLayout={selectedLayout}
            setSelectedLayout={setSelectedLayout}
          />
          <FadeIn className="w-full grow flex items-center justify-center">
            <Feed layout={selectedLayout} />
          </FadeIn>
        </div>
      </BgNoiseWrapper>
    </div>
  );
}

LandingPage.theme = "light";
