import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const getRequest = (state: TRootState) => state[DOMAIN];
const getAuthStrategy = (state: TRootState) => state[DOMAIN].auth.strategy;
const getAuthData = (state: TRootState) => state[DOMAIN].auth.data;
const getBasicAuthData = createSelector(getAuthData, (data) => data.basic);
const getHeaders = (state: TRootState) => state[DOMAIN].headers;
const getActiveHeaders = createSelector(getHeaders, (headers) =>
  headers.filter((h) => h.active)
);
const getHeadersLength = createSelector(getActiveHeaders, (headers) => {
  return headers.length;
});
const getBodyMIME = (state: TRootState) => state[DOMAIN].body.mime;
const getUrl = (state: TRootState) => state[DOMAIN].url;
const getMethod = (state: TRootState) => state[DOMAIN].method;
const getLoading = (state: TRootState) => state[DOMAIN].loading;
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
    case "application/graphql":
      return "graphql";
    default:
      throw new Error(`unknown mime received: ${mime}`);
  }
});
const getActiveOptsEditor = (state: TRootState) =>
  state[DOMAIN].activeOptsEditor;
const getQuery = (state: TRootState) => state[DOMAIN].query;
const getQueryLength = createSelector(getQuery, (query) => {
  return query.length;
});
const getSettings = (state: TRootState) => state[DOMAIN].settings;
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
  getRequest,
  getActiveBodyEditor,
  getActiveOptsEditor,
  getAuthData,
  getAuthStrategy,
  getBasicAuthData,
  getHeaders,
  getHeadersLength,
  getBodyMIME,
  getLoading,
  getMethod,
  getQuery,
  getQueryLength,
  getRequestReadyHeaders,
  getSettings,
  getUrl,
};
