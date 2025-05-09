import Image from "next/image";

const NoFileSelected = () => (
  <div className="size-full px-4 md:px-10 pt-10 pointer-events-none">
    <div className="flex flex-col justify-center items-center gap-2 w-full aspect-[1/1] rounded-full border border-grey-moss-400 relative overflow-hidden">
      <div className="size-full absolute left-0 right-0 bg-grey-moss-100 opacity-[0.7]" />
      <p className="font-archivo-medium text-sm md:text-lg z-[2] text-center px-2">
        drop an image, video, pdf, link, or embed
      </p>
      <button
        type="button"
        className="bg-grey-moss-200 text-grey-moss-50 font-archivo-medium rounded-md px-4 py-2 z-[2]"
      >
        choose media
      </button>
    </div>
    <div className="flex justify-center py-2 block md:hidden">
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
