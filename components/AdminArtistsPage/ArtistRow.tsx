import { TableCell, TableRow } from "@/components/ui/table";
import CopyButton from "@/components/CopyButton/CopyButton";
import { Artist } from "@/types/artist";

interface ArtistRowProps {
  artist: Artist;
}

const ArtistRow = ({ artist }: ArtistRowProps) => {
  return (
    <TableRow className="transition-colors hover:bg-muted/50">
      <TableCell className="px-6 py-4">
        {artist.username ? (
          <span className="text-sm font-medium">@{artist.username}</span>
        ) : (
          <span className="text-xs text-neutral-400">—</span>
        )}
      </TableCell>
      <TableCell className="px-6 py-4">
        <CopyButton
          text={artist.address}
          className="bg-transparent px-0 py-0 font-mono text-xs text-foreground hover:text-grey-moss-400"
        />
      </TableCell>
    </TableRow>
  );
};

export default ArtistRow;
