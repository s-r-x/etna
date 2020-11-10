import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import qs from "query-string";
import { WebApi } from "@/utils/webapi";
import filesStore from "@/store/_files";

const getAuthStrategy = (state: TRootState) => state.httpRequest.auth.strategy;
const getAuthData = (state: TRootState) => state.httpRequest.auth.data;
const getBasicAuthData = createSelector(getAuthData, (data) => data.basic);
const getHeaders = (state: TRootState) => state.httpRequest.headers;
const getActiveHeaders = createSelector(getHeaders, (headers) =>
  headers.filter((h) => h.active)
);
const getHeadersLength = createSelector(getActiveHeaders, (headers) => {
  return headers.length;
});
const getBodyText = (state: TRootState) => state.httpRequest.bodyText;
const getBodyKV = (state: TRootState) => state.httpRequest.bodyKV;
const getRequestReadyBodyKV = createSelector(getBodyKV, (kv) => {
  return kv
    .filter(({ active }) => active)
    .reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {} as TStringDict);
});
const getFiles = () => filesStore.getFiles();
const getBodyMIME = (state: TRootState) => state.httpRequest.bodyMime;
const getRequestReadyBody = createSelector(
  getBodyText,
  getRequestReadyBodyKV,
  getBodyMIME,
  getFiles,
  (text, kv, mime, files): string | FormData => {
    switch (mime) {
      case "application/json":
      case "text/html":
      case "text/plain":
      case "application/xml":
        return text;
      case "application/x-www-form-urlencoded":
        return qs.stringify(kv);
      case "multipart/form-data":
        return WebApi.createFormData(kv, files);
      default:
        return null;
    }
  }
);
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
const getSettings = (state: TRootState) => state.httpRequest.settings;
const getRequestReadyHeaders = createSelector(
  getUrl,
  getActiveHeaders,
  getSettings,
  (url, headers, settings) => {
    const norm = headers.reduce((acc, header) => {
      if (header.key) {
        if (settings.useProxy) {
          acc["x-etna-header-" + header.key] = header.value;
        } else {
          acc[header.key] = header.value;
        }
      }
      return acc;
    }, {} as TStringDict);
    if (settings.useProxy) {
      norm["x-etna-target"] = url;
    }
    return norm;
  }
);
export const HttpRequestSelectors = {
  getActiveBodyEditor,
  getActiveOptsEditor,
  getAuthData,
  getAuthStrategy,
  getBasicAuthData,
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
  getRequestReadyBody,
  getSettings,
  getUrl,
};
