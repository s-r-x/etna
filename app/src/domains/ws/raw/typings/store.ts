import { TWsLogItem } from "@ws/shared/typings/store";

export type TWsRawState = {
  connected: boolean;
  connecting: boolean;
  path: string;
  url: string;
  tab: string;
  logs: TWsLogItem[];
  protocols: string[];
  input: {
    mode: "application/json" | "text/plain";
    data: string;
  };
};
