"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import MessagesTableLoading from "@/components/AdminMessagesPage/MessagesTableLoading";
import NoMessagesFound from "@/components/AdminMessagesPage/NoMessagesFound";
import MomentCreationsTableContents from "./MomentCreationsTableContents";

const MomentCreationsTable = () => {
  const {
    moments,
    isLoading,
    error,
    currentPage,
    totalPages,
    hasPrevPage,
    hasNextPage,
    setCurrentPage,
  } = useTimelineProvider();

  if (isLoading) return <MessagesTableLoading />;
  if (error) return <p className="text-red-500">Error loading moments</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Moment Creations</span>
          <Badge variant="outline">
            Page {currentPage} / {totalPages}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {moments.length === 0 ? (
          <NoMessagesFound />
        ) : (
          <>
            <MomentCreationsTableContents moments={moments} />
            <div className="pt-4 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={!hasPrevPage}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={!hasNextPage}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MomentCreationsTable;
