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
      <div className="relative w-full md:w-2/4 flex justify-center text-grey-moss-900">
        <div className="w-fit relative">
          <p className="font-archivo text-2xl md:text-5xl tracking-[-1px] relative z-[2] uppercase">
            <strong>IN PROCESS: A MANIFESTO</strong>
          </p>
          <p className="font-spectral-italic pt-6 relative z-[2] uppercase">
            <em><strong>THE TIMELINE WAS NEVER THEIRS. IT WAS ALWAYS OURS.</strong></em>
          </p>
          <div className="font-spectral text-[11px] md:text-[16px] tracking-[-1px] pt-4 relative z-[2] whitespace-pre-line normal-case">
            {`They told us the artist needed the platform.
Like we were guests at a table built from our own bones.
Like visibility was a favor, not a debt.
Like without them, we would vanish—scattered notes, lost rhythms, blueprints
erased before they were ever built.

`}<strong>They lied.</strong>{`

Platforms have always needed us.
`}<em><strong>The algorithm starves without our stories.</strong></em>{`
The stream is silent without our sound.
The feed is nothing but a blinking cursor, waiting on us to move.
Yet they hold the archive hostage.
Rewrite history in real time.
Bury what doesn&rsquo;t fit their metrics.
And call it discovery.
We refuse.

`}<em><strong>In Process is a space for process. For lineage. For the drafts that built dynasties.</strong></em>{`
For the blueprints they stole, repackaged, and resold.
For the histories that deserve permanence, not expiration dates.

`}<em><strong>In Process is not content—it&rsquo;s record-keeping. It&rsquo;s proof. It&rsquo;s legacy.</strong></em>{`
This is where the work lives.
Where artists own their evolution.
Where every sketch, verse, sound, and glitch is a timestamp in culture.
Here, we own the timeline.
Here, we document in real time, onchain, on our terms.`}
          </div>
          <p className="font-spectral-bold pt-4 text-xl uppercase">
            <em><strong>ALWAYS IN PROCESS.</strong></em>
          </p>
          <div
            className="md:absolute md:bottom-0 md:translate-x-0 md:translate-y-3/4 md:right-0
          relative translate-x-1/2 -translate-y-1/3"
          >
            <Image
              src="/signature.svg"
              blurDataURL="/signature.png"
              alt="not found signature"
              width={isMobile ? 120 : 218}
              height={isMobile ? 107 : 195}
            />
          </div>
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
    </div>
  );
};

export default ManifestoPage;
