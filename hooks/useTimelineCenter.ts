import { useMemo } from "react";
import { Swiper } from "swiper/types";
import { Token } from "@/types/token";
import { TIMLINE_STEP_OFFSET } from "@/lib/consts";

interface useTimelineCenterProps {
  activeIndex: number;
  swiper: Swiper | null;
  feeds: Token[];
}
const useTimelineCenter = ({ activeIndex, swiper, feeds }: useTimelineCenterProps) => {
  const centerIndex = useMemo(() => {
    if (!swiper) return 0;
    const totalWidth = swiper.width;
    let acc = 0;
    const firstIndex = Math.max(activeIndex, 1);
    let i = firstIndex;
    for (i = firstIndex - 1; i < feeds.length; i++) {
      acc += TIMLINE_STEP_OFFSET * 1 + 200;
      if (acc > totalWidth || i === feeds.length - 1) break;
    }
    return Math.floor((firstIndex + i + 1) / 2);
  }, [activeIndex, swiper?.width, feeds]);

  return centerIndex;
};

export default useTimelineCenter;
