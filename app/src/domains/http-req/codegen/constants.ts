import { TCodegenTarget } from "./typings";
import _ from "lodash";

export const AVAILABLE_TARGETS: TCodegenTarget[] = [
  "csharp",
  "java",
  "javascript",
  "node",
  "php",
  "python",
  "shell",
];
export const AVAILABLE_CLIENTS: Record<TCodegenTarget, string[]> = {
  node: ["axios", "fetch", "native", "request", "unirest"],
  javascript: ["axios", "fetch", "jquery", "xhr"],
  shell: ["curl", "wget", "httpie"],
  php: ["curl", "http1", "http2"],
  java: ["asynchttp", "nethttp", "okhttp", "unirest"],
  python: ["python3", "requests"],
  csharp: ["httpclient", "restsharp"],
};

export const OPTIONS_SELECT = AVAILABLE_TARGETS.map((target) => ({
  value: target,
  label: _.capitalize(target),
  children: AVAILABLE_CLIENTS[target].map((client) => ({
    value: client,
    label: client,
  })),
}));
