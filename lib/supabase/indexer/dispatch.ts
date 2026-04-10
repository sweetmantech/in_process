import { listeners } from "./indexerState";

export function dispatch(event: string, payload: any): void {
  listeners.get(event)?.forEach((fn) => fn(payload));
}
