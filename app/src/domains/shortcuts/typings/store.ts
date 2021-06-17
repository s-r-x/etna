import { Maybe } from "@/typings/utils";
import { EShortcutEv } from "./actions";

export type TState = {
  keyToEvent: Record<string, Maybe<EShortcutEv>>;
  eventToKey: Record<EShortcutEv, Maybe<string>>;
  editor: {
    isOpen: boolean;
    event: Maybe<EShortcutEv>;
    pressed: Maybe<string>;
  };
};
