import { Maybe } from "@/typings/utils";
import { EShortcutEv } from "./actions";

export type TState = {
  keysToEvents: Record<string, EShortcutEv>;
  eventsToKeys: Record<EShortcutEv, string[]>;
  editor: {
    isOpen: boolean;
    event: Maybe<EShortcutEv>;
    pressed: Maybe<string>;
  };
};
