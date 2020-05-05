import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { CodeFormatter } from "@/utils/CodeFormatter";

const getResponse = (state: TRootState) => state.httpResponse.response;
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
const isPrettyBodySupported = createSelector(
  getResponseContentType,
  (type): boolean => {
    switch (type) {
      case "application/xml":
      case "text/html":
      case "application/json":
        return true;
      default:
        return false;
    }
  }
);
const getPrettyBody = createSelector(
  getRawBody,
  getResponseContentType,
  isPrettyBodySupported,
  (body, type, supports) => {
    if (!supports || !body || !type) {
      return body;
    }
    return CodeFormatter.format(body, type);
  }
);
const getFilename = createSelector(getResponseContentType, (type) => {
  if (!type) return "response.txt";
  return "response." + type.replace(/.*\//, "").replace(/\+/, "");
});
const getRawHeaders = createSelector(getResponse, (res) => res?.headers ?? {});
const getHeaders = createSelector(getRawHeaders, (headers) => {
  return Object.keys(headers).map((key) => ({
    key,
    value: headers[key] as string,
  }));
});
const getResponseSize = createSelector(
  getResponse,
  (res) => res?.bodySize ?? 0
);
const isImage = createSelector(getResponseContentType, (type): boolean => {
  switch (type) {
    case "image/gif":
    case "image/jpeg":
    case "image/pjpeg":
    case "image/png":
    case "image/svg+xml":
    case "image/webp":
      return true;
    default:
      return false;
  }
});
const isPdf = createSelector(getResponseContentType, (type): boolean => {
  return type === "application/pdf";
});
export const HttpResponseSelectors = {
  getCategory,
  getEditorOpts,
  getFilename,
  getHeaders,
  getRawBody,
  getPrettyBody,
  getResponse,
  getResponseSize,
  getResponseContentType,
  isImage,
  isPdf,
  isPrettyBodySupported,
};
