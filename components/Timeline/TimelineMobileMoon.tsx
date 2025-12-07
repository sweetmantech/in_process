import Image from "next/image";

// Mobile-only moon image for the timeline page
const TimelineMobileMoon = () => (
  <div className="block flex w-full justify-center md:hidden">
    <Image src="/moon.svg" blurDataURL="/moon.png" width={39} height={36} alt="not found moon" />
  </div>
);

export default TimelineMobileMoon;
