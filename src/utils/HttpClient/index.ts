import axios, { CancelTokenSource, AxiosResponse } from "axios";
import { THTTPMethod } from "@/typings/http";

type Opts = {
  headers?: {
    [key: string]: any;
  };
  body?: any;
};
type Response = {
  responseTime: number;
  error?: any;
  status?: number;
  data?: any;
  statusText?: string;
};
export class HttpClient {
  private cancelTokenSource: CancelTokenSource;
  constructor() {
    const CancelToken = axios.CancelToken;
    this.cancelTokenSource = CancelToken.source();
  }
  cancel(msg?: string) {
    this.cancelTokenSource.cancel(msg);
  }
  make = async (
    url: string,
    method: THTTPMethod,
    opts: Opts = {}
  ): Promise<Response> => {
    const requestStart = performance.now();
    let response = {} as Response;
    try {
      const clientResp = await axios({
        method,
        url,
        cancelToken: this.cancelTokenSource.token,
        headers: opts.headers,
        data: opts.body,
      });
      response.data = clientResp.data;
      response.status = clientResp.status;
      response.statusText = clientResp.statusText;
    } catch (e) {
      if (!axios.isCancel(e)) {
        response.error = e.toJSON();
      }
    } finally {
      const requestEnd = performance.now();
      response.responseTime = requestEnd - requestStart;
      return response;
    }
  };
}
