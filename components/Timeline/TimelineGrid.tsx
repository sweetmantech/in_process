import TimelineTable from "@/components/Timeline/Table/TimelineTable";
import ArtSlider from "@/components/ArtSlider/ArtSlider";

const TimelineGrid = () => (
  <div className="md:grid md:grid-cols-12 pb-6 gap-10 relative z-30 pt-20 w-full">
    <div className="w-full md:col-span-8 h-fit">
      <TimelineTable />
    </div>
    <div
      className="hidden md:block col-span-4 relative"
      style={{ maxHeight: "88vh" }}
    >
      <ArtSlider />
    </div>
  </div>
);

export default TimelineGrid;
