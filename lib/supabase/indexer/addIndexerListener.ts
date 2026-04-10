import { listeners, boundEvents, BroadcastHandler } from "./indexerState";
import { ensureChannel } from "./ensureChannel";
import { dispatch } from "./dispatch";

export function addIndexerListener(event: string, handler: BroadcastHandler): void {
  const isFirstForEvent = !listeners.has(event) || listeners.get(event)!.size === 0;
  if (!listeners.has(event)) listeners.set(event, new Set());
  listeners.get(event)!.add(handler);

  const ch = ensureChannel();

  if (isFirstForEvent && !boundEvents.has(event)) {
    ch.on("broadcast", { event }, (payload) => dispatch(event, payload));
    boundEvents.add(event);
  }
}
