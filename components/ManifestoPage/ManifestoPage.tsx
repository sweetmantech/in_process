"use client";

import useIsMobile from "@/hooks/useIsMobile";
import Image from "next/image";

const ManifestoPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="relative px-4 md:px-0 pt-6 md:pt-20 flex flex-col md:flex-row grow w-full pb-[8%] gap-4 md:gap-16">
      <div className="w-full md:w-1/4 aspect-[376/236] md:aspect-[546/1157] relative">
        <Image
          src={isMobile ? "/spiral_top.svg" : "/left_circles.svg"}
          blurDataURL={isMobile ? "/spiral_top.png" : "/left_circles.png"}
          layout="fill"
          alt="not found artwork"
          objectFit="cover"
          objectPosition="right"
        />
      </div>
      <div className="relative w-full md:w-2/4 text-grey-moss-900">
        <div className="block md:hidden absolute w-screen h-full pointer-events-none top-[-120px] -left-4">
          <Image
            src="/mobile-spiral-transparent.svg"
            blurDataURL="/mobile-spiral-transparent.png"
            layout="fill"
            alt="not found image"
            className="plus-lighter"
            objectFit="cover"
            objectPosition="top center"
          />
        </div>
        <p className="font-archivo text-2xl md:text-5xl tracking-[-1px] relative z-[2]">
          in process: a manifesto
        </p>
        <p className="font-spectral-italic pt-6 relative z-[2]">
          THE TIMELINE WAS NEVER THEIRS. IT WAS ALWAYS OURS.
        </p>
        <pre className="font-spectral text-[11px] md:text-[16px] tracking-[-1px] pt-4 relative z-[2]">
          {`They told us the artist needed the platform.
Like we were guests at a table built from our own bones.
Like visibility was a favor, not a debt.
Like without them, we would vanish—scattered notes, lost rhythms, blueprints erased
before they were ever built.
They lied.

Platforms have always needed us.
The algorithm starves without our stories.
The stream is silent without our sound.
The feed is nothing but a blinking cursor, waiting on us to move.
Yet they hold the archive hostage.
Rewrite history in real time.
Bury what doesn’t fit their metrics.
And call it discovery.
We refuse.

This is a space for process. For lineage. For the drafts that built dynasties.
For the blueprints they stole, repackaged, and resold.
For the histories that deserve permanence, not expiration dates.
In Process is not content—it’s record-keeping. It’s proof. It’s legacy.
This is where the work lives.
Where artists own their evolution.
Where every sketch, verse, sound, and glitch is a timestamp in culture.
Here, we own the timeline.
Here, we document in real time, onchain, on our terms.`}
        </pre>
        <p className="font-spectral-bold pt-4 text-xl">ALWAYS IN PROCESS.</p>
        <div className="-translate-y-6 relative flex justify-end pr-4 md:pr-0 w-full md:absolute md:right-1/3 md:top-[calc(100%-50px)]">
          <Image
            src="/signature.svg"
            blurDataURL="/signature.png"
            alt="not found signature"
            width={isMobile ? 120 : 218}
            height={isMobile ? 107 : 195}
          />
        </div>
      </div>
      <div className="w-full md:w-1/4 aspect-[376/236] md:aspect-[546/1157] relative">
        <Image
          src={isMobile ? "/spiral_bottom.svg" : "/right_circles.svg"}
          blurDataURL={isMobile ? "/spiral_bottom.png" : "/right_circles.png"}
          layout="fill"
          alt="not found artwork"
          objectFit="cover"
          objectPosition="left"
        />
      </div>
      <div className="hidden md:block absolute size-full pointer-events-none left-0 md:left-[5%]">
        <Image
          src="/spiral-transparent.svg"
          blurDataURL="/spiral-transparent.png"
          layout="fill"
          alt="not found image"
          className="plus-lighter"
          objectFit="contain"
          objectPosition="top center"
        />
      </div>
    </div>
  );
};

export default ManifestoPage;
