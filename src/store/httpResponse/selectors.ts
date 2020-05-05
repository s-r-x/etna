import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { CodeFormatter } from "@/utils/CodeFormatter";

const getResponse = (state: TRootState) => state.httpResponse.response;
const getResponseSize = createSelector(getResponse, (res): number => {
  return new TextEncoder().encode(res?.data ?? "").length;
});
const getEditorOpts = (state: TRootState) => state.httpResponse.editor;
const getResponseContentType = createSelector(getResponse, (res): string => {
  const type = res?.headers?.["content-type"];
  if (type) {
    return type.replace(/;.*/, "");
  }
  return type;
});
const getCategory = (state: TRootState) => state.httpResponse.category;
const getRawBody = createSelector(getResponse, (res) => res?.data);
const getPrettyBody = createSelector(
  getRawBody,
  getResponseContentType,
  (body, type) => {
    if (!body || !type) {
      return body;
    }
    return CodeFormatter.format(body, type);
  }
);
const getFilename = createSelector(getResponseContentType, (type) => {
  let ext: string;
  if (!type) return "response.txt";
  if (type.endsWith("json")) {
    ext = ".json";
  } else if (type.endsWith("xml")) {
    ext = ".xml";
  } else if (type.endsWith("html")) {
    ext = ".html";
  } else {
    ext = ".txt";
  }
  return "response" + ext;
});
export const HttpResponseSelectors = {
  getCategory,
  getEditorOpts,
  getFilename,
  getRawBody,
  getPrettyBody,
  getResponse,
  getResponseSize,
  getResponseContentType,
};
