import { TWsLogItem } from "@ws/shared/typings/store";
import { TKeyValue } from "@/typings/keyValue";

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