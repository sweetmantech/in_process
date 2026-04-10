import { RealtimeChannel } from "@supabase/supabase-js";

export type BroadcastHandler = (payload: any) => void;

export const listeners = new Map<string, Set<BroadcastHandler>>();

export const boundEvents = new Set<string>();

export const channelRef = { current: null as RealtimeChannel | null };
