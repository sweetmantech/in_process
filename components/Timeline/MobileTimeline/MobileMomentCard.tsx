import { useMomentClick } from "@/hooks/useMomentClick";
import truncated from "@/lib/truncated";
import { Skeleton } from "@/components/ui/skeleton";
import ContentRenderer from "@/components/Renderers";
import { TimelineMoment } from "@/types/moment";

interface MobileMomentCardProps {
  moment: TimelineMoment | undefined;
  prevMoment: TimelineMoment | undefined;
  nextMoment: TimelineMoment | undefined;
}

const MobileMomentCard = ({ moment, prevMoment, nextMoment }: MobileMomentCardProps) => {
  const { handleMomentClick, isLoading, data: metadata } = useMomentClick(moment);

  return (
    <div
      onClick={handleMomentClick}
      className="relative flex flex-col items-center overflow-visible"
    >
      <div className="relative" data-video-hover-area="true">
        <div className="relative z-10 shadow-lg transition-opacity duration-200 ease-out">
          <div className="relative aspect-[360/248] w-[200px] overflow-hidden bg-grey-moss-100 !font-spectral md:w-[300px]">
            {isLoading || !metadata ? (
              <Skeleton className="size-full" />
            ) : (
              <ContentRenderer metadata={metadata} />
            )}
          </div>
        </div>
      </div>
      <div className="h-[60px] w-[0.5px] bg-black" />
      <div className="relative size-2 rounded-full bg-black">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[0.1px] w-screen -translate-x-1/2 -translate-y-1/2 bg-black" />
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 flex w-screen items-start justify-between px-8"
          style={{ transform: "translateX(-50%) translateY(-3px)" }}
        >
          <div className="flex flex-col items-center">
            {prevMoment && (
              <>
                <div className="size-1.5 rounded-full border border-black" />
                <p className="mt-1 font-archivo text-[10px]">
                  {new Date(prevMoment.created_at).toLocaleString()}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            {nextMoment && (
              <>
                <div className="size-1.5 rounded-full border border-black" />
                <p className="mt-1 font-archivo text-[10px]">
                  {new Date(nextMoment.created_at).toLocaleString()}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col items-center">
        <div className="font-spectral-italic text-xs">
          {isLoading || !metadata ? (
            <Skeleton className="w-12 h-4" />
          ) : (
            truncated(metadata?.name || "", 30)
          )}
        </div>
        <div className="font-archivo text-xs">
          {moment ? (
            new Date(moment.created_at).toLocaleString()
          ) : (
            <Skeleton className="w-24 h-4" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMomentCard;
