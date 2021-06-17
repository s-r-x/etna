import { Maybe } from "@/typings/utils";
import { EShortcutEv } from "./actions";

type TCommonDto = {
  event: EShortcutEv;
  key: string;
};
export type TAddShortcutDto = TCommonDto;
export type TOpenShortcutEditorDto = {
  event: EShortcutEv;
  key: Maybe<string>;
};
export type TRmShortcutDto = TCommonDto;
