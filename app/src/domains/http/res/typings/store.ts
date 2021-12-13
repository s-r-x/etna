import { TResponse } from "@/typings/httpClient";

export type TBodyFormatMode = "Pretty" | "Raw";
export type TState = {
  editor: {
    search: string;
    format: TBodyFormatMode;
  };
  response: TResponse;
  category: string;
};
