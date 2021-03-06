import { THttpReqBodyState } from "@/domains/http-req-body/typings/store";
import { THTTPMethod } from "@/typings/http";
import { TResponse } from "@/typings/httpClient";
import { TState as TReqState } from "@/domains/http-req/typings/store";

export type THistoryRequest = Pick<
  TReqState,
  "headers" | "url" | "method" | "query" | "auth"
> & {
  date: string;
};
export type THistoryBody = Pick<THttpReqBodyState, "mime" | "text" | "kv"> & {
  gql: {
    vars: string;
  };
};
export type THistoryResponse = TResponse;
export type THistoryItem = {
  id: string;
  req: THistoryRequest;
  res: THistoryResponse;
  body: THistoryBody;
};
export type TSearchForm = {
  url: string;
  status: number;
  method: THTTPMethod;
  [key: string]: any;
  sort: string;
  sortDir: "asc" | "desc";
  dateRange: [string, string];
};

export type TState = {
  search: string;
  searchForm: TSearchForm;
  items: THistoryItem[];
};
