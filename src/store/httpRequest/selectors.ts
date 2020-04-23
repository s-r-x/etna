import { TRootState } from "@/store/rootReducer";

const getHeaders = (state: TRootState) => state.httpRequest.headers;
const getBody = (state: TRootState) => state.httpRequest.body;
const getUrl = (state: TRootState) => state.httpRequest.url;
const getMethod = (state: TRootState) => state.httpRequest.method;
export const HttpRequestSelectors = {
  getHeaders,
  getBody,
  getUrl,
  getMethod,
};
