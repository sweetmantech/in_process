"use client";

import { FadeIn } from "@/components/ui/fade-in";
import BgNoiseWrapper from "@/components/ui/texture-wrapper";
import Feed from "./Feed";

export default function LandingPage() {
  return (
    <div className="isolate min-h-screen overflow-hidden bg-white bg-gradientTopRightLight">
      <BgNoiseWrapper url="/egg-shell-noise.png">
        <div className="mx-10 relative overflow-hidden min-h-screen flex flex-col">
          <FadeIn className="w-full grow flex-col flex items-center justify-center">
            <Feed />
          </FadeIn>
        </div>
      </BgNoiseWrapper>
    </div>
  );
}

LandingPage.theme = "light";
