import { createSelector } from "@reduxjs/toolkit";
import { TRootState as State } from "@/store/rootReducer";
import { CodeFormatter } from "@/utils/CodeFormatter";
import { DOMAIN } from "./slice";
import _ from "lodash";
import ms from "pretty-ms";
import pb from "pretty-bytes";

const root = (state: State) => state[DOMAIN];
const getResponse = (state: State) => root(state).response;
const hasResponse = (state: State) => !!getResponse(state);
const getEditorOpts = (state: State) => root(state).editor;
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
const getCategory = (state: State) => root(state).category;
const getRawBody = createSelector(getResponse, (res) => res?.data);
const isPrettyBodySupported = createSelector(
  getResponseContentType,
  (type): boolean => {
    switch (type) {
      // case "application/xml":
      // case "text/html":
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
const getRawHeaders = createSelector(getResponse, (res) => res?.headers ?? {});
const getHeaders = createSelector(getRawHeaders, (headers) => {
  return Object.keys(headers).map((key) => ({
    key,
    value: headers[key] as string,
  }));
});
const getResponseStatus = createSelector(getResponse, (res) => res.status);
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

const isBinary = createSelector(getResponse, (res) => res?.isBinary);
const isSvg = createSelector(getResponseContentType, (type) => {
  return type === "image/svg+xml";
});
const isImage = createSelector(getResponseContentType, (type): boolean => {
  switch (type) {
    case "image/gif":
    case "image/jpeg":
    case "image/pjpeg":
    case "image/png":
    case "image/bmp":
    case "image/webp":
    case "image/x-icon":
      return true;
    default:
      return false;
  }
});
const isVideo = createSelector(getResponseContentType, (type): boolean => {
  switch (type) {
    case "video/mp4":
    case "video/webm":
      return true;
    default:
      return false;
  }
});
const isPdf = createSelector(getResponseContentType, (type): boolean => {
  return type === "application/pdf";
});

const getFilename = createSelector(
  [getResponseContentType, isSvg],
  (type, isSvg) => {
    if (!type) return "response.txt";
    if (isSvg) return "response.svg";
    return "response." + type.replace(/.*\//, "").replace(/\+/, "");
  }
);
export const HttpResponseSelectors = {
  hasResponse,
  getCategory,
  getEditorOpts,
  getFilename,
  getHeaders,
  getRawBody,
  getPrettyBody,
  getResponse,
  getResponseSize,
  getResponseContentType,
  isBinary,
  isImage,
  isVideo,
  isSvg,
  isPdf,
  isPrettyBodySupported,

  getResponseStatus,
  getFormattedResponseTime,
  getFormattedResponseSize,
};
