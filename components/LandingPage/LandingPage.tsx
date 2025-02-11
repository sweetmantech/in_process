"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Announcement } from "@/components/ui/announcement";
import { FadeIn } from "@/components/ui/fade-in";
import { Icons } from "@/components/ui/icons";
import { PageActions, PageHeader } from "@/components/ui/page-header";
import BgNoiseWrapper from "@/components/ui/texture-wrapper";
import { GradientHeading } from "@/components/ui/gradient-heading";
import Image from "next/image";
import CollectionInput from "./CollectionInput";
import { useLatestFeed } from "@/hooks/useLatestFeed";
import HorizontalFeed from "../HorizontalFeed";

export default function LandingPage() {
  const { feed } = useLatestFeed();

  return (
    <div className=" isolate min-h-screen overflow-hidden bg-white bg-gradientTopRightLight pb-8 sm:pb-12 md:pb-0">
      <div className="container relative pt-12"></div>

      <BgNoiseWrapper url="/egg-shell-noise.png">
        <div className="container relative pt-12">
          <PageHeader>
            <FadeIn>
              <Announcement />
            </FadeIn>
            <FadeIn>
              <GradientHeading
                size="xl"
                weight="bold"
                className="text-center text-xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
              >
                In Process <br className="hidden md:block" /> By LATASHÁ
              </GradientHeading>
            </FadeIn>
            {feed.length > 0 && <HorizontalFeed feed={feed} />}
            <FadeIn>
              <div className="flex flex-wrap items-center justify-center gap-1 text-center text-base  leading-3  text-foreground md:text-2xl md:font-normal md:leading-6">
                <span>A feed</span>

                <span> for your digital art on Zora.</span>
                <div className="rounded-full border border-black/10 p-1 shadow-lg">
                  <Image
                    src="/images/zorb.png"
                    alt="zorb"
                    height={20}
                    width={20}
                    className="h-5 w-5"
                  />
                </div>

                <span>Bring your own style.</span>
                <span className="">Built on Base. </span>
                <div className="rounded-full border border-black/10 p-1 shadow-lg">
                  <Image
                    src="/images/base.png"
                    alt="base"
                    height={20}
                    width={20}
                    className="h-5 w-5"
                  />
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mt-6 flex flex-col items-center gap-4 w-[500px]">
                <CollectionInput />
              </div>
            </FadeIn>

            <FadeIn>
              <PageActions>
                <Link
                  href={`/collect/zora:0x59b10f7f139de30ad22d162857efc770d980f5a2`}
                  className={cn(buttonVariants())}
                >
                  Get Started
                </Link>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/SweetmanTech/IN_PROCESS"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  <Icons.gitHub className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </PageActions>
            </FadeIn>
          </PageHeader>
        </div>
      </BgNoiseWrapper>
    </div>
  );
}
LandingPage.theme = "light";
