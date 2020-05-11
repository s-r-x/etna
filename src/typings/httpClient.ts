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
