import Image from "next/image";

// Mobile-only moon image for the timeline page
const TimelineMobileMoon = () => (
  <div className="block md:hidden w-full flex justify-center">
    <Image
      src="/moon.svg"
      blurDataURL="/moon.png"
      width={39}
      height={36}
      alt="not found moon"
    />
  </div>
);

export default TimelineMobileMoon;
