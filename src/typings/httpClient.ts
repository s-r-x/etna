export type TOpts = {
  headers?: {
    [key: string]: any;
  };
  body?: any;
};
export type TResponse = {
  responseTime: number;
  error?: boolean;
  status?: number;
  data?: string;
  statusText?: string;
  headers?: { [key: string]: string };
};
