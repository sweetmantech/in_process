"use client";

import { useEffect, useState } from "react";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { ArrowRight } from "@/components/ui/icons";
import MobileMomentCard from "./MobileMomentCard";

const MobileTimeline = () => {
  const { moments } = useTimelineProvider();
  const [currentIndex, setCurrentIndex] = useState(0);
  const reversed = [...moments].reverse();
  const moment = reversed[currentIndex];
  const prevMoment = reversed[currentIndex - 1];
  const nextMoment = reversed[currentIndex + 1];

  useEffect(() => {
    if (moments.length > 0) {
      setCurrentIndex(moments.length - 1);
    }
  }, [moments.length]);
  return (
    <div className="mt-8 flex items-end justify-between overflow-x-clip">
      {currentIndex > 0 ? (
        <button
          type="button"
          className="z-10 p-2 text-black mb-8"
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          <ArrowRight className="h-6 w-6 rotate-180" />
        </button>
      ) : (
        <div className="w-10" />
      )}

      <MobileMomentCard moment={moment} prevMoment={prevMoment} nextMoment={nextMoment} />

      {currentIndex < moments.length - 1 ? (
        <button
          type="button"
          className="z-10 p-2 text-black mb-8"
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
};

export default MobileTimeline;
