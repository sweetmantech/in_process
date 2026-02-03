import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Message } from "@/types/message";

interface MessageRowProps {
  message: Message;
}

const MessageRow = ({ message }: MessageRowProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getPartsPreview = (parts: unknown[]): string => {
    if (!parts || parts.length === 0) return "-";
    const firstPart = parts[0];
    if (typeof firstPart === "string") {
      return firstPart.length > 50 ? `${firstPart.slice(0, 50)}...` : firstPart;
    }
    if (typeof firstPart === "object" && firstPart !== null && "text" in firstPart) {
      const text = (firstPart as { text: string }).text;
      return text.length > 50 ? `${text.slice(0, 50)}...` : text;
    }
    return JSON.stringify(firstPart).slice(0, 50);
  };

  return (
    <TableRow>
      <TableCell className="font-mono text-xs">{message.id.slice(0, 8)}...</TableCell>
      <TableCell>
        <Badge variant={message.role === "user" ? "default" : "secondary"}>{message.role}</Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline">{message.metadata.client}</Badge>
      </TableCell>
      <TableCell className="max-w-xs truncate">{getPartsPreview(message.parts)}</TableCell>
      <TableCell className="text-neutral-500">
        {message.metadata.artist_address
          ? `${message.metadata.artist_address.slice(0, 6)}...${message.metadata.artist_address.slice(-4)}`
          : "-"}
      </TableCell>
      <TableCell className="text-neutral-500">{formatDate(message.metadata.created_at)}</TableCell>
    </TableRow>
  );
};

export default MessageRow;
