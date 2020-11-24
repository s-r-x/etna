import { TKeyValue } from "@/typings/keyValue";
import { EWsClient } from ".";

export enum EWsLogLevel {
  ERR,
  OK,
  INFO,
}
export enum EWsRouteType {
  IN,
  OUT,
}
export type TWsLogItem = {
  id: string;
  date: string;
  ev: string;
  lvl: EWsLogLevel;
  msg: string;
  route: EWsRouteType;
};
export type TWsState = {
  activeClient: EWsClient;
};
export type TPhoenixState = {
  connected: boolean;
  url: string;
};
export type TSocketIOState = {
  connected: boolean;
  path: string;
  url: string;
  logs: TWsLogItem[];
  query: { key: string; value: string }[];
  headers: TKeyValue[];
  input: {
    mode: "application/json" | "text/plain";
    event: string;
    data: string;
  };
};
