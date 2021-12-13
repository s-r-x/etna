import { THistoryRequest } from "@/domains/http/history/typings/store";
import { THTTPMethod } from "@/domains/http/shared/typings";
import { TKeyValue } from "@/typings/keyValue";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  TAuthStrategy,
  TQuery,
  TRequestSettings,
  TRestoreParams,
} from "./store";

export type TChangeMethodDto = PayloadAction<THTTPMethod>;
export type TRestoreRequestDto = PayloadAction<TRestoreParams>;
export type TUpdateSettingsDto = PayloadAction<Partial<TRequestSettings>>;
export type TAddHeaderDto = PayloadAction<Partial<TKeyValue> | null>;
export type TChangeHeaderKeyDto = PayloadAction<{ id: number; key: string }>;
export type TChangeHeaderValueDto = PayloadAction<{
  id: number;
  value: string;
}>;
export type TChangeHeaderActiveDto = PayloadAction<{
  id: number;
  active: boolean;
}>;
export type TChangeUrlDto = PayloadAction<string>;
export type TRestoreFromHistoryDto = PayloadAction<THistoryRequest>;
export type TRemoveHeaderDto = PayloadAction<number>;
export type TUpdateBasicAuthDto = PayloadAction<TStringDict>;
export type TChangeAuthStrategyDto = PayloadAction<TAuthStrategy>;
export type TSetQueryDto = PayloadAction<TQuery[]>;
export type TRemoveQueryDto = PayloadAction<number>;
