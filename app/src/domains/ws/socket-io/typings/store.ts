import { TWsLogItem } from "@ws/shared/typings/store";
import { TKeyValue } from "@/typings/keyValue";

export type TSocketIOState = {
  connected: boolean;
  connecting: boolean;
  path: string;
  url: string;
  tab: string;
  logs: TWsLogItem[];
  query: { key: string; value: string }[];
  headers: TKeyValue[];
  options: string;
  input: {
    mode: "application/json" | "text/plain";
    event: string;
    data: string;
  };
};
