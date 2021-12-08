import { EWsConnStatus, TWsLogItem } from "@ws/shared/typings";
import { TKeyValue } from "@/typings/keyValue";

export type TSocketIOState = {
  connStatus: EWsConnStatus;
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
