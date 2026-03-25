"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsFilters as Filters } from "@/types/timeline";
import { Search } from "lucide-react";
import { useState } from "react";

interface AnalyticsFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const AnalyticsFilters = ({ filters, onChange }: AnalyticsFiltersProps) => {
  const [artistInput, setArtistInput] = useState(filters.artist ?? "");
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  const commitArtist = () => set({ artist: artistInput || undefined });

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <div className="relative">
        <Input
          className="h-7 w-44 rounded-full pl-3 pr-8 text-xs"
          placeholder="Artist name or address"
          value={artistInput}
          onChange={(e) => setArtistInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && commitArtist()}
        />
        <button
          onClick={commitArtist}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
        </button>
      </div>

      <Select
        value={filters.period ?? "all"}
        onValueChange={(v) => set({ period: v === "all" ? undefined : (v as Filters["period"]) })}
      >
        <SelectTrigger className="h-7 w-28 text-xs">
          <SelectValue placeholder="Period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All time</SelectItem>
          <SelectItem value="day">Last 24h</SelectItem>
          <SelectItem value="week">Last 7 days</SelectItem>
          <SelectItem value="month">Last 30 days</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.channel ?? "all"}
        onValueChange={(v) => set({ channel: v === "all" ? undefined : (v as Filters["channel"]) })}
      >
        <SelectTrigger className="h-7 w-28 text-xs">
          <SelectValue placeholder="Channel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All channels</SelectItem>
          <SelectItem value="telegram">Telegram</SelectItem>
          <SelectItem value="sms">SMS</SelectItem>
          <SelectItem value="web">Web</SelectItem>
          <SelectItem value="api">API</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.contentType ?? "all"}
        onValueChange={(v) =>
          set({ contentType: v === "all" ? undefined : (v as Filters["contentType"]) })
        }
      >
        <SelectTrigger className="h-7 w-28 text-xs">
          <SelectValue placeholder="Content type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="audio">Audio</SelectItem>
          <SelectItem value="image">Image</SelectItem>
          <SelectItem value="video">Video</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnalyticsFilters;
