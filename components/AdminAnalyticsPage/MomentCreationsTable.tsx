"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TimelineProvider, useTimelineProvider } from "@/providers/TimelineProvider";
import MessagesTableLoading from "@/components/AdminMessagesPage/MessagesTableLoading";
import NoMessagesFound from "@/components/AdminMessagesPage/NoMessagesFound";
import MomentCreationsTableContents from "./MomentCreationsTableContents";

const MomentCreationsTableInner = () => {
  const { moments, isLoading, error, hasNextPage, isFetchingNextPage, fetchMore } =
    useTimelineProvider();

  if (isLoading) return <MessagesTableLoading />;
  if (error) return <p className="text-red-500">Error loading moments</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Moment Creations</span>
          <Badge variant="outline">{moments.length} loaded</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {moments.length === 0 ? (
          <NoMessagesFound />
        ) : (
          <>
            <MomentCreationsTableContents moments={moments} />
            {hasNextPage && (
              <div className="pt-4 flex justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchMore}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const MomentCreationsTable = () => (
  <TimelineProvider includeHidden={true}>
    <MomentCreationsTableInner />
  </TimelineProvider>
);

export default MomentCreationsTable;
