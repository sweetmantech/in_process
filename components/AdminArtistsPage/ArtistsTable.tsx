"use client";

import { useAdminArtists } from "@/hooks/useAdminArtists";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ArtistsTableLoading from "./ArtistsTableLoading";
import ArtistsTableError from "./ArtistsTableError";
import NoArtistsFound from "./NoArtistsFound";
import ArtistsTableContents from "./ArtistsTableContents";
import ArtistsPagination from "./ArtistsPagination";

const ArtistsTable = () => {
  const { data, isLoading, error, currentPage, setCurrentPage } = useAdminArtists({
    type: "human",
  });

  if (isLoading || !data) return <ArtistsTableLoading />;
  if (error) return <ArtistsTableError error={error} />;

  const artists = data?.artists ?? [];
  const totalPages = data?.pagination.total_pages ?? 1;
  const totalCount = data?.pagination.total;

  return (
    <Card>
      <CardContent className="p-0">
        {artists.length === 0 ? (
          <NoArtistsFound />
        ) : (
          <div className="p-4">
            <ArtistsTableContents artists={artists} />
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
