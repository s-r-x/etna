import { THTTPMethod } from "../../shared/typings";

export type THistoryItem = {
  method: THTTPMethod;
  date: string;
  url: string;
  status: number;
  id: string;
};
