import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";

interface TimelineHeroProps {
  totalCount: number;
}

const TimelineHero = ({ totalCount }: TimelineHeroProps) => {
  return (
    <div className="pt-12 pb-4 flex flex-col md:flex-row md:justify-between md:items-start">
      {/* Description Text */}
      <div className="mb-8 md:mb-0">
        <h1 className="font-archivo text-2xl md:text-5xl tracking-[-1px] text-black">
          an onchain collective timeline
        </h1>
        <p className="font-spectral-italic text-2xl md:text-5xl tracking-[-1px] text-black mt-1">
          for artists
        </p>
      </div>
      
      {/* Moments Count + Create Button (Desktop: Right side, Mobile: Below description) */}
      <div className="flex flex-col items-center md:items-end">
        <MomentCount count={totalCount} />
        <div className="mt-2">
          <CreateButton />
        </div>
      </div>
    </div>
  );
};

export default TimelineHero;