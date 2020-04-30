import axios, { CancelTokenSource } from "axios";
import { THTTPMethod } from "@/typings/http";
import { TResponse, TOpts } from "@/typings/httpClient";

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
    opts: TOpts = {}
  ): Promise<TResponse> => {
    const requestStart = performance.now();
    let response = {} as TResponse;
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
        if (e.isAxiosError) {
          response.status = e.response.status;
          response.data = e.response.data;
        }
      }
    } finally {
      const requestEnd = performance.now();
      response.responseTime = requestEnd - requestStart;
      return response;
    }
  };
}
