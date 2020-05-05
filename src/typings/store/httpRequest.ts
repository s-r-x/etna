import { THTTPMethod, THTTPBodyMIME } from "@/typings/http";
import { TKeyValue } from "@/typings/keyValue";

export type TRestoreParams = {
  method: THTTPMethod;
  url: string;
};
export type TAuthStrategy = "bearer_token" | "basic" | "none";
export type TOptsKey = "headers" | "body" | "query" | "auth" | "settings";
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
export type TRequestSettings = {
  [key: string]: any;
  expectBinary: boolean;
};
export type TQuery = { key: string; value: string };
export type TState = {
  method: THTTPMethod;
  url: string;
  baseUrl: string;
  query: TQuery[];
  headers: TKeyValue[];
  activeOptsEditor: TOptsKey;
  loading: boolean;
  auth: TAuth;
  bodyMime: THTTPBodyMIME;
  bodyText: string;
  bodyKV: TKeyValue[];
  settings: TRequestSettings;
};
