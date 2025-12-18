import TimelineTable from "@/components/Timeline/Table/TimelineTable";
import ArtSlider from "@/components/ArtSlider/ArtSlider";

const TimelineGrid = () => (
  <div className="relative z-30 w-full gap-10 pb-6 md:grid md:grid-cols-12">
    <div className="h-fit w-full md:col-span-8">
      <TimelineTable />
    </div>
    <div className="relative col-span-4 hidden md:block" style={{ maxHeight: "88vh" }}>
      <ArtSlider />
    </div>
  </div>
);

export default TimelineGrid;
