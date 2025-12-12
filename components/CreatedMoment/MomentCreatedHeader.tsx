import Image from "next/image";
import Buttons from "./Buttons";

const MomentCreatedHeader = () => {
  return (
    <div className="flex w-full items-end gap-3">
      <div className="relative w-full">
        <p className="font-archivo-medium text-2xl md:text-4xl xl:text-5xl">moment created</p>
        <div className="absolute -bottom-[calc(100%+50px)] right-10 block aspect-[1/1] w-1/2 md:hidden">
          <Image
            src="/semi-transparent.png"
            alt="not found semi"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <Buttons />
      </div>
    </div>
  );
};

export default MomentCreatedHeader;
