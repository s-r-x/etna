import { TWsLogItem } from "@ws/shared/typings/store";

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
  input: {
    mode: "application/json" | "text/plain";
    event: string;
    data: string;
  };
};
