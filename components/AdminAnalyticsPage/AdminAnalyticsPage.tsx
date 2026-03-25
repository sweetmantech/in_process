"use client";

import { TimelineProvider } from "@/providers/TimelineProvider";
import MomentCreationsTable from "./MomentCreationsTable";
import MomentsTimelineChart from "./MomentsTimelineChart";

const AdminAnalyticsPage = () => {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Analytics</h1>
      <div className="flex flex-col gap-6">
        <TimelineProvider includeHidden={true}>
          <MomentsTimelineChart />
        </TimelineProvider>
        <TimelineProvider includeHidden={true} paginated limit={10}>
          <MomentCreationsTable />
        </TimelineProvider>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
