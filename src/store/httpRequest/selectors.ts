import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import qs from "query-string";
const getHeaders = (state: TRootState) => state.httpRequest.headers;
const getBody = (state: TRootState) => state.httpRequest.body.content;
const getBodyMIME = (state: TRootState) => state.httpRequest.body.mime;
const getUrl = (state: TRootState) => state.httpRequest.url;
const getMethod = (state: TRootState) => state.httpRequest.method;
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
const getFiles = (state: TRootState) => state.httpRequest.files;
export const HttpRequestSelectors = {
  getActiveOptsEditor,
  getHeaders,
  getBody,
  getBodyMIME,
  getFiles,
  getMethod,
  getParsedQuery,
  getUrl,
};
