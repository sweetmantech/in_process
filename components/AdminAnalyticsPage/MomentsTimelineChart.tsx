"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildChartData } from "@/lib/analytics/buildChartData";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MomentsTimelineChart = () => {
  const { moments, isLoading, hasNextPage, isFetchingNextPage, fetchMore } = useTimelineProvider();

  if (isLoading) return null;

  const data = buildChartData(moments);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Moments × Time</span>
          {hasNextPage && (
            <Button variant="outline" size="sm" onClick={fetchMore} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? "Loading..." : "← Load earlier"}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="momentsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
              formatter={(value) => [value, "Moments"]}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#momentsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MomentsTimelineChart;
