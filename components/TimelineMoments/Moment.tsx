import { FC, useState } from "react";
import { motion } from "framer-motion";
import MomentHover from "./MomentHover";
import truncated from "@/lib/truncated";
import { TIMLINE_STEP_OFFSET } from "@/lib/consts";
import HideButton from "./HideButton";
import useArtistEditable from "@/hooks/useArtistEditable";
import { TimelineMoment } from "@/types/moment";
import { useMomentClick } from "@/hooks/useMomentClick";

interface MomentProps {
  moment: TimelineMoment;
  hovered: boolean;
  step: number;
  height: number;
  index: number;
}

const Moment: FC<MomentProps> = ({ moment, hovered, step, height, index }) => {
  const { handleMomentClick, isLoading, data } = useMomentClick(moment);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { isEditable } = useArtistEditable();

  if (isHidden) return null;

  return (
    <motion.div
      className="relative"
      style={{
        paddingLeft: `${TIMLINE_STEP_OFFSET * step}px`,
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isFadingOut ? 0 : 1 }}
      transition={{ duration: 0.4 }}
      onAnimationComplete={() => {
        if (isFadingOut) {
          setIsHidden(true);
        }
      }}
    >
      <fieldset className="flex flex-col items-center">
        <button
          data-moment-button
          data-moment-index={index}
          className="focus-visible:ring-primary relative z-10 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
          onClick={handleMomentClick}
        >
          {hovered ? (
            <span
              style={{ color: "#4E4E4E", fontSize: "8px" }}
              className="absolute left-[4px] -translate-x-1/2 -translate-y-1/2"
            >
              ⬤
            </span>
          ) : (
            <div className="absolute bottom-[0px] size-2 rounded-full border border-grey-moss-900 bg-grey-moss-100 md:bottom-[-2px]" />
          )}
          <div
            className="absolute -bottom-[20px] left-[4px] z-[-1] w-[0.5px] bg-black transition-all duration-200 ease-out"
            style={{
              height: `${height}px`,
            }}
          >
            <div className="relative size-full">
              {hovered && data && (
                <div className="absolute bottom-full">
                  <MomentHover isLoading={isLoading} data={data} />
                </div>
              )}
            </div>
          </div>
        </button>
        {hovered && isEditable && (
          <div className="relative flex translate-y-6 items-center gap-2 pt-2">
            <p className="font-spectral-italic text-sm md:text-xl">{truncated(data?.name || "")}</p>
            <HideButton moment={moment} onClick={() => setIsFadingOut(true)} />
          </div>
        )}
        <p
          className={`min-w-[200px] normal-case text-center font-archivo ${hovered ? "md:text-md translate-y-6 text-sm" : "pt-8 text-xs opacity-0 md:text-sm md:opacity-[1]"}`}
        >
          {new Date(moment.created_at).toLocaleString()}
        </p>
      </fieldset>
    </motion.div>
  );
};

export default Moment;
