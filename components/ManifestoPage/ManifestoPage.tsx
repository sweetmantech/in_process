"use client";

import Image from "next/image";

const ManifestoPage = () => {
  return (
    <div className="px-3 md:px-10 pt-20 flex flex-col md:flex-row items-center grow w-full pb-[8%]">
      <div className="w-1/3 aspect-[551/565] relative hidden md:block">
        <Image src="/artwork.png" layout="fill" alt="not found artwork" />
      </div>
      <div className="relative w-full md:w-1/3">
        <p className="font-archivo-medium text-2xl md:text-5xl tracking-[-1px]">
          in process manifesto
        </p>
        <pre className="font-spectral text-[9px] md:text-[16px] tracking-[-1px] pt-4 !normal-case">
          {`IN PROCESS: A MANIFESTO
THE TIMELINE WAS NEVER THEIRS. IT WAS ALWAYS OURS.
They told us the artist needed the platform.
Like we were guests at a table built from our own bones.
Like visibility was a favor, not a debt.
Like without them, we would vanish—scattered notes, lost rhythms, blueprints erased before they were ever built.
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
Here, we document in real time, onchain, on our terms.
Here, art doesn’t need permission.
The world doesn’t move without the artist.
And this time, we don’t ask. We take.
IN PROCESS. ALWAYS.
`}
        </pre>
        <div className="absolute right-[-18%] top-[calc(100%+4px)] w-[12.5%] aspect-[72/91] hidden md:block">
          <Image src="/sign2.png" alt="not found sign2" layout="fill" />
        </div>
        <div className="absolute right-[-15%] top-[calc(100%+20px)] w-[52%] aspect-[294/259] hidden md:block">
          <Image
            src="/sign0.png"
            alt="not found sign0"
            width={294}
            height={259}
          />
        </div>
      </div>
    </div>
  );
};

export default ManifestoPage;
