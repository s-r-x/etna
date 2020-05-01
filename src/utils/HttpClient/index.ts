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
    const response = {} as TResponse;
    try {
      const clientResp = await axios({
        method,
        url,
        cancelToken: this.cancelTokenSource.token,
        headers: opts.headers,
        data: opts.body,
        // prevent json parsing
        transformResponse: (r) => r,
      });
      response.data = clientResp.data;
      response.status = clientResp.status;
      response.statusText = clientResp.statusText;
      response.headers = clientResp.headers;
    } catch (e) {
      response.error = true;
      if (!axios.isCancel(e) && e.isAxiosError) {
        console.dir(e);
        response.status = e?.response?.status;
        response.data = e?.response?.data ?? e?.message;
        response.headers = e?.response?.headers;
      } else {
        response.data = e?.message;
      }
    } finally {
      const requestEnd = performance.now();
      response.responseTime = requestEnd - requestStart;
      return response;
    }
  };
}
