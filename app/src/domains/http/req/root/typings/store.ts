import { THTTPMethod } from "@/typings/http";
import { TKeyValue } from "@/typings/keyValue";

export type TRestoreParams = {
  method: THTTPMethod;
  url: string;
};
export type TAuthStrategy = "bearer_token" | "basic" | "none";
export type TOptsKey =
  | "headers"
  | "body"
  | "query"
  | "auth"
  | "settings"
  | "codegen"
  | "history";
export type TAuth = {
  strategy: TAuthStrategy;
  data: {
    basic: {
      [key: string]: string;
      username: string;
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
  useProxy: boolean;
};
export type TQuery = { key: string; value: string };
export type TState = {
  method: THTTPMethod;
  url: string;
  query: TQuery[];
  headers: TKeyValue[];
  activeOptsEditor: TOptsKey;
  loading: boolean;
  auth: TAuth;
  settings: TRequestSettings;
};
