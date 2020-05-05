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
const getRawHeaders = createSelector(getResponse, (res) => res?.headers ?? {});
const getHeaders = createSelector(getRawHeaders, (headers) => {
  return Object.keys(headers).map((key) => ({
    key,
    value: headers[key] as string,
  }));
});
const getResponseSize = createSelector(
  getRawBody,
  getRawHeaders,
  (body, headers): number => {
    if ("content-length" in headers) {
      return Number(headers["content-length"]);
    } else {
      return new TextEncoder().encode(body || "").length;
    }
  }
);
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
  isPrettyBodySupported,
};
