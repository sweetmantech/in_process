import { supabase } from "../client";
import { listeners, channelRef, boundEvents, BroadcastHandler } from "./indexerState";

export function removeIndexerListener(event: string, handler: BroadcastHandler): void {
  listeners.get(event)?.delete(handler);
  const total = [...listeners.values()].reduce((n, s) => n + s.size, 0);
  if (total === 0 && channelRef.current) {
    supabase.removeChannel(channelRef.current);
    channelRef.current = null;
    listeners.clear();
    boundEvents.clear();
  }
}
