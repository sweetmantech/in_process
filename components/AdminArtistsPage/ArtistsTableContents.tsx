import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Artist } from "@/types/artist";
import ArtistRow from "./ArtistRow";

interface ArtistsTableContentsProps {
  artists: Artist[];
  showUsername?: boolean;
}

const ArtistsTableContents = ({ artists, showUsername = true }: ArtistsTableContentsProps) => {
  return (
    <div className="overflow-auto rounded-md border">
      <Table className="min-w-[800px] md:min-w-0">
        <TableHeader>
          <TableRow>
            {showUsername && <TableHead className="w-32 px-6 py-4">Username</TableHead>}
            <TableHead className="w-48 px-6 py-4">Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {artists.map((artist) => (
            <ArtistRow key={artist.address} artist={artist} showUsername={showUsername} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ArtistsTableContents;
