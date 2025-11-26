import { FC, useState } from "react";
import { motion } from "framer-motion";
import { useClickMoment } from "@/hooks/useClickMoment";
import truncated from "@/lib/truncated";
import { TIMLINE_STEP_OFFSET } from "@/lib/consts";
import MomentPopover from "./MomentPopover";
import useArtistEditable from "@/hooks/useArtistEditable";
import { Moment } from "@/types/timeline";

interface TimelineMomentProps {
  moment: Moment;
  hovered: boolean;
  step: number;
  height: number;
  index: number;
}

const TimelineMoment: FC<TimelineMomentProps> = ({ moment, hovered, step, height, index }) => {
  const { isLoading, data, handleClick, formattedDate } = useClickMoment(moment);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { isEditable } = useArtistEditable();

  if (isHidden) return null;

  return (
    <motion.div
      className="relative px-0"
      style={{
        paddingLeft: `${TIMLINE_STEP_OFFSET * step}px`,
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => {
        if (isFadingOut) {
          setIsHidden(true);
          setIsFadingOut(false);
        }
      }}
    >
      <fieldset className="flex flex-col items-center">
        <button
          data-feed-button
          data-feed-index={index}
          className="relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75 transition-transform hover:scale-110"
          onClick={handleClick}
        >
          {hovered ? (
            <tspan
              fill="#4E4E4E"
              font-size="8"
              className="-translate-x-1/2 left-[4px] -translate-y-1/2 absolute"
            >
              ⬤
            </tspan>
          ) : (
            <div className="size-2 border border-grey-moss-900 bg-grey-moss-100 rounded-full md:bottom-[-2px] bottom-[0px] absolute" />
          )}
          <div
            className="z-[-1] w-[0.5px] bg-black -bottom-[20px] left-[4px] absolute transition-all duration-200 ease-out"
            style={{
              height: `${height}px`,
            }}
          >
            <div className="relative size-full">
              {hovered && data && (
                <div className="absolute bottom-full">
                  <MomentPopover isLoading={isLoading} data={data} />
                </div>
              )}
            </div>
          </div>
        </button>
        {hovered && isEditable && (
          <div className="flex gap-2 items-center relative translate-y-6 pt-2">
            <p className="font-spectral-italic text-sm md:text-xl">{truncated(data?.name || "")}</p>
          </div>
        )}
        <p
          className={`min-w-[200px] text-center font-archivo ${hovered ? "translate-y-6 text-sm md:text-md" : "opacity-0 md:opacity-[1] pt-8 text-xs md:text-sm"}`}
        >
          {formattedDate}
        </p>
      </fieldset>
    </motion.div>
  );
};

export default TimelineMoment;
