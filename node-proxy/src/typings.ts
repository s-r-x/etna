export interface IProxyRes {
  bin: boolean;
  status: number;
  headers: Record<string, string>;
  data: string;
  method: string;
  url: string;
  time: number;
  size: number;
  error: boolean;
}
