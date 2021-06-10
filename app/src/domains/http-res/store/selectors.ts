import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { CodeFormatter } from "@/utils/CodeFormatter";
import { DOMAIN } from "./slice";
import _ from "lodash";
import ms from "pretty-ms";
import pb from "pretty-bytes";

const getResponse = (state: TRootState) => state[DOMAIN].response;
const getEditorOpts = (state: TRootState) => state[DOMAIN].editor;
const getResponseContentType = createSelector(getResponse, (res): string => {
  const type = res?.headers?.["content-type"];
  if (type) {
    return type.replace(/;.*/, "");
  }
  return type;
});
const getFormattedResponseTime = createSelector(getResponse, (res) => {
  if (_.isNil(res.responseTime)) {
    return ms(0);
  }
  return ms(res.responseTime);
});
const getCategory = (state: TRootState) => state[DOMAIN].category;
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
const getResponseStatus = createSelector(getResponse, res => res.status);
const getResponseSize = createSelector(
  getResponse,
  (res) => res?.bodySize ?? 0
);
const getFormattedResponseSize = createSelector(getResponseSize, (size) => {
  if (_.isNil(size)) {
    return pb(0);
  }
  return pb(size);
});

const isImage = createSelector(getResponseContentType, (type): boolean => {
  switch (type) {
    case "image/gif":
    case "image/jpeg":
    case "image/pjpeg":
    case "image/png":
    case "image/bmp":
    case "image/svg+xml":
    case "image/webp":
    case "image/x-icon":
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

  getResponseStatus,
  getFormattedResponseTime,
  getFormattedResponseSize,
};
