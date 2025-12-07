import MomentCount from "@/components/Timeline/MomentCount";
import CreateButton from "@/components/Timeline/CreateButton";

const MobileMomentsSection = () => {
  return (
    <div className="flex flex-col items-center pb-2 pt-4 md:hidden">
      <MomentCount />
      <div className="mt-4">
        <CreateButton />
      </div>
    </div>
  );
};

export default MobileMomentsSection;
