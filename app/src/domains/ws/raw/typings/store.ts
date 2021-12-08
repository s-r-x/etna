import { EWsConnStatus, TWsLogItem } from "@ws/shared/typings";

export type TWsRawState = {
  connStatus: EWsConnStatus;
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
