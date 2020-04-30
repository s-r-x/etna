import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import qs from "query-string";

const getAuthStrategy = (state: TRootState) => state.httpRequest.auth.strategy;
const getAuthData = (state: TRootState) => state.httpRequest.auth.data;
const getHeaders = (state: TRootState) => state.httpRequest.headers;
const getBodyText = (state: TRootState) => state.httpRequest.bodyText;
const getBodyKV = (state: TRootState) => state.httpRequest.bodyKV;
const getBodyMIME = (state: TRootState) => state.httpRequest.bodyMime;
const getUrl = (state: TRootState) => state.httpRequest.url;
const getMethod = (state: TRootState) => state.httpRequest.method;
const getLoading = (state: TRootState) => state.httpRequest.loading;
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

export const HttpRequestSelectors = {
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
  getUrl,
};
