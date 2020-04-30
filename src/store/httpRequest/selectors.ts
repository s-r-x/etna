import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import qs from "query-string";
import _ from "lodash";

const getAuthStrategy = (state: TRootState) => state.httpRequest.auth.strategy;
const getAuthData = (state: TRootState) => state.httpRequest.auth.data;
const getHeaders = (state: TRootState) => state.httpRequest.headers;
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
const getParsedQuery = createSelector(getUrl, (url) => {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch (e) {
    return {};
  }
  const query = qs.parse(parsedUrl.search);
  return query;
});
const getResponse = (state: TRootState) => state.httpRequest.response;
const getRawResponseBody = createSelector(getResponse, (resp): string => {
  let stringified: string;
  if (resp) {
    if (_.isObject(resp.data)) {
      stringified = JSON.stringify(resp.data);
    } else {
      stringified = String(resp.data);
    }
  } else {
    stringified = "";
  }
  return stringified;
});
const getResponseSize = createSelector(
  getResponse,
  getRawResponseBody,
  (_res, raw): number => {
    return new TextEncoder().encode(raw).length;
  }
);
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
  getParsedQuery,
  getResponse,
  getRawResponseBody,
  getResponseSize,
  getUrl,
};
