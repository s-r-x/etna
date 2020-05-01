import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";

const getAuthStrategy = (state: TRootState) => state.httpRequest.auth.strategy;
const getAuthData = (state: TRootState) => state.httpRequest.auth.data;
const getHeaders = (state: TRootState) => state.httpRequest.headers;
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
// TODO:: performance refactor
const getQuery = (state: TRootState) => state.httpRequest.query;
const getResponse = (state: TRootState) => state.httpRequest.response;
const getResponseSize = createSelector(getResponse, (res): number => {
  return new TextEncoder().encode(res?.data ?? "").length;
});
export const HttpRequestSelectors = {
  getActiveBodyEditor,
  getActiveOptsEditor,
  getAuthData,
  getAuthStrategy,
  getHeaders,
  getBodyText,
  getBodyKV,
  getBodyMIME,
  getLoading,
  getMethod,
  getQuery,
  getRequestReadyHeaders,
  getResponse,
  getResponseSize,
  getUrl,
};
