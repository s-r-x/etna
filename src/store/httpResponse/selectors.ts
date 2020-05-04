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
export const HttpResponseSelectors = {
  getCategory,
  getEditorOpts,
  getRawBody,
  getPrettyBody,
  getResponse,
  getResponseSize,
  getResponseContentType,
};
