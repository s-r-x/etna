import axios, { CancelTokenSource, AxiosResponse } from "axios";
import { THTTPMethod } from "@/typings/http";
import { TResponse, TOpts } from "@/typings/httpClient";

export class HttpClient {
  private cancelTokenSource: CancelTokenSource;
  private extractBodySize(res: AxiosResponse): number {
    if (!res.data) {
      return 0;
    }
    if ("content-length" in res.headers) {
      return Number(res.headers["content-length"]);
    }
    if (res.data instanceof Blob) {
      return res.data.size;
    }
    return new TextEncoder().encode(res.data).length;
  }
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
    const response = {
      isBinary: false,
    } as TResponse;
    try {
      console.log(opts.body);
      const axiosResp = await axios({
        method,
        url,
        cancelToken: this.cancelTokenSource.token,
        headers: opts.headers,
        data: opts.body,
        // prevent json parsing
        transformResponse: (r) => r,
        responseType: opts.expectBinary ? "blob" : "text",
        ...(opts.auth && { auth: opts.auth }),
      });
      response.status = axiosResp.status;
      response.statusText = axiosResp.statusText;
      response.headers = axiosResp.headers;
      response.bodySize = this.extractBodySize(axiosResp);
      if (axiosResp.data) {
        if (opts.expectBinary) {
          response.data = URL.createObjectURL(axiosResp.data);
          response.isBinary = true;
        } else {
          response.data = axiosResp.data;
        }
      }
    } catch (e) {
      response.error = true;
      if (!axios.isCancel(e) && e.isAxiosError) {
        console.dir(e);
        response.status = e?.response?.status;
        response.data = e?.response?.data ?? e?.message;
        response.headers = e?.response?.headers;
        response.bodySize = response?.data?.length ?? 0;
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
