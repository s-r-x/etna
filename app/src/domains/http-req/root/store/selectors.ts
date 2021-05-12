import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const getRequest = (state: TRootState) => state[DOMAIN];
const getAuthStrategy = (state: TRootState) => state[DOMAIN].auth.strategy;
const getAuthData = (state: TRootState) => state[DOMAIN].auth.data;
const getBasicAuthData = createSelector(getAuthData, (data) => data.basic);
const getAuth = createSelector(
  getAuthStrategy,
  getBasicAuthData,
  (strategy, basic) => {
    if (strategy === "basic") {
      return basic;
    }
    return null;
  }
);
const getHeaders = (state: TRootState) => state[DOMAIN].headers;
const getActiveHeaders = createSelector(getHeaders, (headers) =>
  headers.filter((h) => h.active)
);
const getHeadersLength = createSelector(getActiveHeaders, (headers) => {
  return headers.length;
});
const getUrl = (state: TRootState) => state[DOMAIN].url;
const getMethod = (state: TRootState) => state[DOMAIN].method;
const getLoading = (state: TRootState) => state[DOMAIN].loading;
const getActiveOptsEditor = (state: TRootState) =>
  state[DOMAIN].activeOptsEditor;
const getQuery = (state: TRootState) => state[DOMAIN].query;
const getQueryLength = createSelector(getQuery, (query) => {
  return query.length;
});
const getSettings = (state: TRootState) => state[DOMAIN].settings;

const IMMUTABLE_HEADERS = "content-type";
const getRequestReadyHeaders = createSelector(
  getUrl,
  getActiveHeaders,
  getSettings,
  (url, headers, settings) => {
    const norm = headers.reduce((acc, header) => {
      if (header.key) {
        if (settings.useProxy) {
          if (!IMMUTABLE_HEADERS.includes(header.key.toLowerCase())) {
            acc["x-etna-header-" + header.key] = header.value;
          } else {
            acc[header.key] = header.value;
          }
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
  getActiveOptsEditor,
  getAuth,
  getAuthData,
  getAuthStrategy,
  getBasicAuthData,
  getHeaders,
  getHeadersLength,
  getLoading,
  getMethod,
  getQuery,
  getQueryLength,
  getRequestReadyHeaders,
  getSettings,
  getUrl,
};
