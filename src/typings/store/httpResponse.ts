import { TResponse } from "@/typings/httpClient";

export type TBodyFormatMode = "Pretty" | "Raw" | "Preview";
export type TState = {
  editor: {
    expanded: boolean;
    search: string;
    format: TBodyFormatMode;
  };
  response: TResponse;
  category: string;
};
