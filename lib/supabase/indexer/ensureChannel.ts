import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "../client";
import { channelRef, listeners, boundEvents } from "./indexerState";
import { dispatch } from "./dispatch";

export function ensureChannel(): RealtimeChannel {
  if (channelRef.current) return channelRef.current;

  let ch = supabase.channel("indexer");
  for (const event of listeners.keys()) {
    ch = ch.on("broadcast", { event }, (payload) => dispatch(event, payload));
    boundEvents.add(event);
  }
  channelRef.current = ch.subscribe();
  return channelRef.current;
}
