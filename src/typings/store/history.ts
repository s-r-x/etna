import { THTTPMethod } from "@/typings/http";

export type TSearchForm = Pick<THistoryItem, "url" | "status" | "method"> & {
  [key: string]: any;
  sort: string;
};
export type THistoryItem = {
  method: THTTPMethod;
  date: string;
  url: string;
  wait: number;
  status: number;
  id: string;
};

export type TState = {
  search: string;
  searchForm: TSearchForm;
  items: THistoryItem[];
};
