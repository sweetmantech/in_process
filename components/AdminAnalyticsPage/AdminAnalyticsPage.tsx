"use client";

import { useState } from "react";
import { TimelineProvider } from "@/providers/TimelineProvider";
import { AnalyticsFilters } from "@/types/timeline";
import MomentCreationsTable from "./MomentCreationsTable";
import MomentsTimelineChart from "./MomentsTimelineChart";
import AnalyticsFiltersBar from "./AnalyticsFilters";

const AdminAnalyticsPage = () => {
  const [filters, setFilters] = useState<AnalyticsFilters>({});

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Admin Analytics</h1>
      <div className="flex flex-col gap-6">
        <AnalyticsFiltersBar filters={filters} onChange={setFilters} />
        <TimelineProvider
          includeHidden={true}
          period={filters.period}
          channel={filters.channel}
          contentType={filters.contentType}
          artistAddress={filters.artist}
        >
          <MomentsTimelineChart />
        </TimelineProvider>
        <TimelineProvider
          includeHidden={true}
          paginated
          limit={10}
          period={filters.period}
          channel={filters.channel}
          contentType={filters.contentType}
          artistAddress={filters.artist}
        >
          <MomentCreationsTable />
        </TimelineProvider>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
