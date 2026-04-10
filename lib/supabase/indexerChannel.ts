import { supabase } from "./client";
import { RealtimeChannel } from "@supabase/supabase-js";

type BroadcastHandler = (payload: any) => void;

const listeners = new Map<string, Set<BroadcastHandler>>();
let channel: RealtimeChannel | null = null;

function dispatch(event: string, payload: any): void {
  listeners.get(event)?.forEach((fn) => fn(payload));
}

function ensureChannel(): RealtimeChannel {
  if (!channel) {
    channel = supabase.channel("indexer").subscribe();
  }
  return channel;
}

export function addIndexerListener(event: string, handler: BroadcastHandler): void {
  const isFirstForEvent = !listeners.has(event) || listeners.get(event)!.size === 0;
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event)!.add(handler);
  const ch = ensureChannel();
  if (isFirstForEvent) {
    ch.on("broadcast", { event }, (payload) => dispatch(event, payload));
  }
}

export function removeIndexerListener(event: string, handler: BroadcastHandler): void {
  listeners.get(event)?.delete(handler);
  const total = [...listeners.values()].reduce((n, s) => n + s.size, 0);
  if (total === 0 && channel) {
    supabase.removeChannel(channel);
    channel = null;
    listeners.clear();
  }
}
