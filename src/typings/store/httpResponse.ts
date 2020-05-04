import { TResponse } from "@/typings/httpClient";

export type TCategory = "body" | "headers";
export type TBodyFormatMode = "pretty" | "raw";
export type TState = {
  editor: {
    expanded: boolean;
    search: string;
    format: TBodyFormatMode;
  };
  response: TResponse;
  category: TCategory;
};
