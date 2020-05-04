import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";

const getAuthStrategy = (state: TRootState) => state.httpRequest.auth.strategy;
const getAuthData = (state: TRootState) => state.httpRequest.auth.data;
const getHeaders = (state: TRootState) => state.httpRequest.headers;
const getActiveHeaders = createSelector(getHeaders, (headers) =>
  headers.filter((h) => h.active)
);
const getHeadersLength = createSelector(getActiveHeaders, (headers) => {
  return headers.length;
});
const getRequestReadyHeaders = createSelector(getHeaders, (raw) => {
  return raw.reduce((acc, header) => {
    if (header.key) {
      acc[header.key] = header.value;
    }
    return acc;
  }, {} as { [key: string]: string });
});
const getBodyText = (state: TRootState) => state.httpRequest.bodyText;
const getBodyKV = (state: TRootState) => state.httpRequest.bodyKV;
const getBodyMIME = (state: TRootState) => state.httpRequest.bodyMime;
const getUrl = (state: TRootState) => state.httpRequest.url;
const getMethod = (state: TRootState) => state.httpRequest.method;
const getLoading = (state: TRootState) => state.httpRequest.loading;
const getActiveBodyEditor = createSelector(getBodyMIME, (mime) => {
  switch (mime) {
    case "application/json":
    case "application/xml":
    case "text/html":
    case "text/plain":
      return "text";
    case "application/x-www-form-urlencoded":
    case "multipart/form-data":
      return "kv";
    case "binary":
      return "file";
    default:
      throw new Error(`unknown mime received: ${mime}`);
  }
});
const getActiveOptsEditor = (state: TRootState) =>
  state.httpRequest.activeOptsEditor;
const getQuery = (state: TRootState) => state.httpRequest.query;
const getQueryLength = createSelector(getQuery, (query) => {
  return query.length;
});
export const HttpRequestSelectors = {
  getActiveBodyEditor,
  getActiveOptsEditor,
  getAuthData,
  getAuthStrategy,
  getHeaders,
  getHeadersLength,
  getBodyText,
  getBodyKV,
  getBodyMIME,
  getLoading,
  getMethod,
  getQuery,
  getQueryLength,
  getRequestReadyHeaders,
  getUrl,
};
