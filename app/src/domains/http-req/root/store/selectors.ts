import { createSelector } from "@reduxjs/toolkit";
import { TRootState as State } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const root = (state: State) => state[DOMAIN];
const getAuthStrategy = (state: State) => root(state).auth.strategy;
const getAuthData = (state: State) => root(state).auth.data;
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
const getHeaders = (state: State) => root(state).headers;
const getActiveHeaders = createSelector(getHeaders, (headers) =>
  headers.filter((h) => h.active)
);
const getHeadersLength = (state: State) => getActiveHeaders(state).length;
const getUrl = (state: State) => root(state).url;
const getNormalizedUrl = createSelector(getUrl, (url): string => {
  try {
    const parsed = new URL(url);
    if (["http:", "https:"].includes(parsed.protocol)) {
      return url;
    }
  } catch (_e) {}
  return "http://" + url;
});
const isUrlValid = createSelector(getNormalizedUrl, (url) => {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
});
const getMethod = (state: State) => root(state).method;
const getLoading = (state: State) => root(state).loading;
const getActiveOptsEditor = (state: State) => state[DOMAIN].activeOptsEditor;
const getQuery = (state: State) => root(state).query;
const getQueryLength = (state: State) => getQuery(state).length;
const getSettings = (state: State) => root(state).settings;
const shouldUseProxy = (state: State) => getSettings(state).useProxy;

const IMMUTABLE_HEADERS = ["content-type", "Content-type"];
const normalizeHeaderKey = (rawKey: string, useProxy: boolean) => {
  const key = rawKey.toLowerCase();
  if (IMMUTABLE_HEADERS.includes(key)) {
    return key;
  }
  return useProxy ? "x-etna-header-" + key : key;
};
const getRequestReadyHeaders = createSelector(
  getNormalizedUrl,
  getActiveHeaders,
  getSettings,
  getMethod,
  (url, headers, settings, method) => {
    const norm = headers.reduce((acc, header) => {
      if (header.key) {
        const key = normalizeHeaderKey(header.key, settings.useProxy);
        if (key in acc) {
          const v = acc[key];
          acc[key] = Array.isArray(v)
            ? v.concat(header.value)
            : [v, header.value];
        } else {
          acc[key] = header.value;
        }
      }
      return acc;
    }, {} as Record<string, string | string[]>);
    if (settings.useProxy) {
      norm["x-etna-target"] = url;
    }
    if (settings.useProxy) {
      norm["x-etna-method"] = method;
    }
    return norm;
  }
);

export const HttpRequestSelectors = {
  getRequest: root,
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
  isUrlValid,
  shouldUseProxy,
  getNormalizedUrl,
};
