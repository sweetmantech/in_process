"use client";

import { useState } from "react";
import { useAdminArtists } from "@/hooks/useAdminArtists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ArtistsTableLoading from "./ArtistsTableLoading";
import ArtistsTableError from "./ArtistsTableError";
import NoArtistsFound from "./NoArtistsFound";
import ArtistsTableContents from "./ArtistsTableContents";
import ArtistsPagination from "./ArtistsPagination";

type ArtistType = "human" | "bot";

const ArtistsTable = () => {
  const [activeTab, setActiveTab] = useState<ArtistType>("human");
  const { data, isLoading, error, currentPage, setCurrentPage } = useAdminArtists({
    type: activeTab,
  });

  const handleTabChange = (tab: ArtistType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  if (isLoading || !data) return <ArtistsTableLoading />;
  if (error) return <ArtistsTableError error={error} />;

  const artists = data?.artists ?? [];
  const totalPages = data?.pagination.total_pages ?? 1;
  const totalCount = data?.pagination.total;

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center justify-between">
          <div className="flex gap-4">
            {(["human", "bot"] as ArtistType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-1 text-sm font-medium capitalize transition-all ${
                  activeTab === tab
                    ? "border-b-2 border-black text-black"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <Badge variant="outline">{artists.length} shown</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {artists.length === 0 ? (
          <NoArtistsFound />
        ) : (
          <div className="p-4">
            <ArtistsTableContents artists={artists} showUsername={activeTab === "human"} />
            {totalPages > 1 && (
              <ArtistsPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistsTable;
