import Image from "next/image";

const NoFileSelected = () => (
  <div className="pointer-events-none size-full px-4 pt-10 md:px-10">
    <div className="relative flex aspect-[1/1] w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-full border border-grey-moss-400">
      <div className="absolute left-0 right-0 size-full bg-grey-moss-100 opacity-[0.7]" />
      <p className="z-[2] px-2 text-center font-archivo-medium text-sm md:text-lg">
        drop an image, video, pdf, link, or embed
      </p>
      <button
        type="button"
        className="z-[2] rounded-md bg-grey-moss-200 px-4 py-2 font-archivo-medium text-grey-moss-50"
      >
        choose media
      </button>
    </div>
    <div className="block flex justify-center py-2 md:hidden">
      <Image
        src="/moment.svg"
        blurDataURL="moment.png"
        alt="not found moment"
        unoptimized
        width={108}
        height={186}
        className="self-center"
      />
    </div>
  </div>
);

export default NoFileSelected;
