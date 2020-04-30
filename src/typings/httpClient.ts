export type TOpts = {
  headers?: {
    [key: string]: any;
  };
  body?: any;
};
export type TResponse = {
  responseTime: number;
  error?: any;
  status?: number;
  data?: string;
  statusText?: string;
};
