import { THTTPMethod } from "./http";

export type THistoryItem = {
  method: THTTPMethod;
  date: string;
  url: string;
  status: number;
  id: string;
};
