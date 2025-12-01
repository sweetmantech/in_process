import { useMemo } from "react";
import { Swiper } from "swiper/types";
import { TIMLINE_STEP_OFFSET } from "@/lib/consts";
import { TimelineMoment } from "@/types/moment";

interface useTimelineCenterProps {
  activeIndex: number;
  swiper: Swiper | null;
  moments: TimelineMoment[];
}
const useTimelineCenter = ({ activeIndex, swiper, moments }: useTimelineCenterProps) => {
  const centerIndex = useMemo(() => {
    if (!swiper) return 0;
    const totalWidth = swiper.width;
    let acc = 0;
    const firstIndex = Math.max(activeIndex, 1);
    let i = firstIndex;
    for (i = firstIndex - 1; i < moments.length; i++) {
      acc += TIMLINE_STEP_OFFSET * 1 + 200;
      if (acc > totalWidth || i === moments.length - 1) break;
    }
    return Math.floor((firstIndex + i + 1) / 2);
  }, [activeIndex, swiper?.width, moments]);

  return centerIndex;
};

export default useTimelineCenter;
