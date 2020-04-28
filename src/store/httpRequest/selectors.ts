import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import qs from "query-string";

const getHeaders = (state: TRootState) => state.httpRequest.headers;
const getBody = (state: TRootState) => state.httpRequest.body;
const getUrl = (state: TRootState) => state.httpRequest.url;
const getMethod = (state: TRootState) => state.httpRequest.method;
const getActiveOptsEditor = (state: TRootState) =>
  state.httpRequest.activeOptsEditor;
const getParsedQuery = createSelector(getUrl, (url) => {
  console.log('here');
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
  getHeaders,
  getBody,
  getUrl,
  getMethod,
  getActiveOptsEditor,
  getParsedQuery,
};
