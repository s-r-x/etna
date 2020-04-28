import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";

export type TAuthStrategy = "bearer_token" | "basic" | "none";
export type TOptsKey = "headers" | "body" | "query" | "auth";
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
export type TAuth = {
  strategy: TAuthStrategy;
  data: {
    basic: {
      user: string;
      password: string;
    };
    bearer_token: {
      token: string;
    };
  }
};
export type TState = {
  method: THTTPMethod;
  url: string;
  headers: THeader[];
  body: TBody;
  activeOptsEditor: TOptsKey;
  loading: boolean;
  auth: TAuth;
};
