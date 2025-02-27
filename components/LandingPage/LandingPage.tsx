"use client";

import { FadeIn } from "@/components/ui/fade-in";
import BgNoiseWrapper from "@/components/ui/texture-wrapper";
import Feeds from "./Feeds";

export default function LandingPage() {
  return (
    <div className="isolate min-h-screen overflow-hidden">
      <BgNoiseWrapper>
        <div className="mx-10 relative overflow-hidden min-h-screen flex flex-col">
          <FadeIn className="w-full grow flex-col flex items-center justify-center">
            <Feeds />
          </FadeIn>
        </div>
      </BgNoiseWrapper>
    </div>
  );
}

LandingPage.theme = "light";
