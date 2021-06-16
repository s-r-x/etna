import { EShortcutEv } from "./actions";

export type TState = {
  bindings: Record<EShortcutEv, string>;
};
