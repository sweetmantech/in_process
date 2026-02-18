import Image from "next/image";

// Mobile-only moon image for the timeline page
const TimelineMobileMoon = () => (
  <div className="flex w-full justify-center mt-12">
    <Image src="/moon.svg" blurDataURL="/moon.png" width={39} height={36} alt="not found moon" />
  </div>
);

export default TimelineMobileMoon;
