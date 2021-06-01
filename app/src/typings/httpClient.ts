import { THTTPMethod } from "./http";

export type TOpts = {
  headers?: {
    [key: string]: any;
  };
  body?: any;
  expectBinary?: boolean;
  auth?: {
    username: string;
    password: string;
  };
  useProxy?: boolean;
};
export type TResponse = {
  responseTime: number;
  bodySize?: number;
  error?: boolean;
  status?: number;
  data?: string;
  statusText?: string;
  isBinary: boolean;
  headers?: { [key: string]: string };
};
export type TProxyResponse = {
  bin: boolean;
  data: string;
  headers: { [key: string]: string };
  status: number;
  method: THTTPMethod;
  time: number;
  size: number;
};
