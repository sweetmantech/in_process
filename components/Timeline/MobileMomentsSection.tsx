import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";

const MobileMomentsSection = () => {
  return (
    <div className="md:hidden flex flex-col items-center pt-4 pb-2">
      <MomentCount />
      <div className="mt-4">
        <CreateButton />
      </div>
    </div>
  );
};

export default MobileMomentsSection;
