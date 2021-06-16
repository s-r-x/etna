import { EShortcutEv } from "./actions";

export type TState = {
  keysToEvents: Record<string, EShortcutEv>;
  eventsToKeys: Record<EShortcutEv, string[]>;
};
