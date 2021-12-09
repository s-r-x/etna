import { createSelector } from "@reduxjs/toolkit";
import { TRootState as State } from "@/store/rootReducer";
import { DOMAIN } from "./slice";
import { Header } from "har-format";
import { HttpReqBodySelectors as BodySelectors } from "@/domains/http-req/body/store/selectors";
import { TKeyValue } from "@/typings/keyValue";

const $ = (state: State) => state[DOMAIN];
const getAuthStrategy = (state: State) => $(state).auth.strategy;
const getAuthData = (state: State) => $(state).auth.data;
const getBasicAuthData = createSelector(getAuthData, data => data.basic);
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
const getMethod = (state: State) => $(state).method;
const getLoading = (state: State) => $(state).loading;
const getActiveOptsEditor = (state: State) => $(state).activeOptsEditor;
const getQuery = (state: State) => $(state).query;
const getQueryLength = (state: State) => getQuery(state).length;
const getSettings = (state: State) => $(state).settings;
const shouldUseProxy = (state: State) => getSettings(state).useProxy;
const shouldAppendBody = createSelector(getMethod, method => {
  return method !== "GET" && method !== "DELETE";
});
const getUrl = (state: State) => $(state).url;
const getNormalizedUrl = createSelector(getUrl, (url): string => {
  try {
    const parsed = new URL(url);
    if (["http:", "https:"].includes(parsed.protocol)) {
      return url;
    }
  } catch (_e) {}
  return "http://" + url;
});
const isUrlValid = createSelector(getNormalizedUrl, url => {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
});
const getHeaders = (state: State) => $(state).headers;
const getActiveHeaders = createSelector(getHeaders, headers =>
  headers.filter(h => h.active)
);
const getHeadersLength = (state: State) => getActiveHeaders(state).length;
const IMMUTABLE_HEADERS = new Set(["content-type", "Content-type"]);
const normalizeHeaderKey = (rawKey: string, useProxy: boolean) => {
  const key = rawKey.toLowerCase();
  if (IMMUTABLE_HEADERS.has(key)) {
    return key;
  }
  return useProxy ? "x-etna-header-" + key : key;
};

const getNormalizedHeaders = createSelector(
  getActiveHeaders,
  BodySelectors.getRequestReadyMIME,
  shouldAppendBody,
  (headers, bodyMime, shouldAppendBody) => {
    let hasContentTypeHeader = false;
    const normalized = headers.reduce((acc, header) => {
      if (header.key) {
        if (header.key.toLowerCase() === "content-type") {
          hasContentTypeHeader = true;
          acc.push(
            shouldAppendBody ? { key: header.key, value: bodyMime } : header
          );
        } else {
          acc.push(header);
        }
      }
      return acc;
    }, [] as TKeyValue[]);
    if (!hasContentTypeHeader && shouldAppendBody) {
      normalized.push({ key: "content-type", value: bodyMime });
    }
    return normalized;
  }
);

const getRequestReadyHeaders = createSelector(
  getNormalizedUrl,
  getNormalizedHeaders,
  getSettings,
  getMethod,
  (url, headers, settings, method) => {
    const norm = headers.reduce((acc, header) => {
      const key = normalizeHeaderKey(header.key, settings.useProxy);
      const value = header.value;
      if (key in acc) {
        const accValue = acc[key];
        acc[key] = Array.isArray(accValue)
          ? accValue.concat(value)
          : [accValue, value];
      } else {
        acc[key] = value;
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
const getSnippetReadyHeaders = createSelector(
  getNormalizedHeaders,
  (headers): Header[] => {
    return headers.map(header => ({ name: header.key, value: header.value }));
  }
);

export const HttpRequestSelectors = {
  getRequest: $,
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
  getSnippetReadyHeaders,
  getSettings,
  getUrl,
  isUrlValid,
  shouldUseProxy,
  shouldAppendBody,
  getNormalizedUrl,
};
