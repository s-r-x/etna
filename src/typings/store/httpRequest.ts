import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";

export type TOptsKey = "headers" | "body" | "query";
export type THeader = {
  id: string;
  key: string;
  value: string;
  active: boolean;
};
export type TBody = {
  mime: THTTPBodyMIME;
  raw: boolean;
  content: string;
};
export type TState = {
  method: THTTPMethod;
  url: string;
  headers: THeader[];
  body: TBody;
  activeOptsEditor: TOptsKey;
};
