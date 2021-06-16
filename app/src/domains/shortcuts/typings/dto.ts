import { EShortcutEv } from "./actions";

type TCommonDto = {
  event: EShortcutEv;
  key: string;
};
export type TAddShortcutDto = TCommonDto;
export type TRmShortcutDto = TCommonDto;
