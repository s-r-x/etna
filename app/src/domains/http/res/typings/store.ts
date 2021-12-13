import { TResponse } from "@/domains/http/shared/typings/http-client";

export type TBodyFormatMode = "Pretty" | "Raw";
export type TState = {
  editor: {
    search: string;
    format: TBodyFormatMode;
  };
  response: TResponse;
  category: string;
};
