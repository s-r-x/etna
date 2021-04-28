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
  room?: string;
  date: string;
  ev: string;
  lvl: EWsLogLevel;
  msg: string;
  route: EWsRouteType;
};
export type TWsState = {
  activeClient: EWsClient;
};
export type TStorePhoenixChannel = {
  topic: string;
};
export type TPhoenixCreateChannelForm = {
  topic: string;
};
export type TStorePhoenixEvent = {
  id: string;
  ev: string;
  ch: string;
};
export type TPhoenixEventForm = {
  channel: string;
  event: string;
};
export type TPhoenixState = {
  connected: boolean;
  url: string;
  tab: string;
  connTab: string;
  query: { key: string; value: string }[];
  channels: TStorePhoenixChannel[];
  channelsConnStatuses: {
    topic: string;
    connected: boolean;
  }[];
  events: TStorePhoenixEvent[];
  createChForm: TPhoenixCreateChannelForm;
  createEvForm: TPhoenixEventForm;
  logs: TWsLogItem[];
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
