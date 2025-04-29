"use client";

import Image from "next/image";

const ManifestoPage = () => {
  return (
    <div className="px-4 md:px-0 pt-20 flex flex-col md:flex-row grow w-full pb-[8%] md:gap-16">
      <div className="w-1/4 aspect-[546/1157] relative hidden md:block">
        <Image
          src="/left_circles.svg"
          blurDataURL="/left_circles.png"
          layout="fill"
          alt="not found artwork"
          objectFit="cover"
          objectPosition="right"
        />
      </div>
      <div className="relative w-full md:w-2/4 text-grey-moss-900">
        <p className="font-archivo text-2xl md:text-5xl tracking-[-1px]">
          in process: a manifesto
        </p>
        <p className="font-spectral-italic pt-6">
          THE TIMELINE WAS NEVER THEIRS. IT WAS ALWAYS OURS.
        </p>
        <pre className="font-spectral text-[11px] md:text-[16px] tracking-[-1px] pt-4">
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
        <div className="absolute right-1/3 top-[calc(100%-50px)] hidden md:block">
          <Image
            src="/signature.svg"
            blurDataURL="/signature.png"
            alt="not found signature"
            width={218}
            height={195}
          />
        </div>
      </div>
      <div className="absolute size-full pointer-events-none left-[5%]">
        <Image
          src="/spiral-transparent.svg"
          blurDataURL="/spiral-transparent.png"
          layout="fill"
          alt="not found image"
          className="plus-lighter"
          objectFit="cover"
          objectPosition="top"
        />
      </div>
      <div className="w-1/4 aspect-[546/1157] relative hidden md:block">
        <Image
          src="/right_circles.png"
          blurDataURL="/right_circles.svg"
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
