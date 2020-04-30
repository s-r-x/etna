import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";
import { TKeyValue } from "@/typings/keyValue";

export type TAuthStrategy = "bearer_token" | "basic" | "none";
export type TOptsKey = "headers" | "body" | "query" | "auth";
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
  };
};
export type TState = {
  method: THTTPMethod;
  url: string;
  headers: TKeyValue[];
  activeOptsEditor: TOptsKey;
  loading: boolean;
  auth: TAuth;
  bodyMime: THTTPBodyMIME;
  bodyText: string;
  bodyKV: TKeyValue[];
};
