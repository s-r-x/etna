import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";
import filesStore from "@/store/_files";
import { buildClientSchema } from "graphql";
import { WebApi } from "@/utils/webapi";
import qs from "query-string";

const getFullBody = (state: TRootState) => state[DOMAIN];
const getText = (state: TRootState) => state[DOMAIN].text;
const getMIME = (state: TRootState) => state[DOMAIN].mime;
const getKV = (state: TRootState) => state[DOMAIN].kv;
const getFiles = () => filesStore.getFiles();
const getRequestReadyKV = createSelector(getKV, (kv) => {
  return kv
    .filter(({ active }) => active)
    .reduce((acc, { key, value }) => {
      acc[key] = value;
      return acc;
    }, {} as TStringDict);
});
const getActiveEditor = createSelector(getMIME, (mime) => {
  switch (mime) {
    case "application/json":
    case "application/xml":
    case "text/html":
    case "text/plain":
      return "text";
    case "application/x-www-form-urlencoded":
    case "multipart/form-data":
      return "kv";
    case "application/graphql":
      return "graphql";
    default:
      throw new Error(`unknown mime received: ${mime}`);
  }
});
const getGqlRawSchema = (state: TRootState) => state[DOMAIN].gql.schema;
const getGqlSchema = createSelector(getGqlRawSchema, (schema) => {
  try {
    return schema && buildClientSchema(JSON.parse(schema)?.data);
  } catch (_e) {
    return null;
  }
});
const isGqlSchemaLoading = (state: TRootState) => state[DOMAIN].gql.loading;
const getGqlSchemaError = (state: TRootState) => state[DOMAIN].gql.error;
const getGqlVars = (state: TRootState) => state[DOMAIN].gql.vars;
const getParsedGqlVars = createSelector(getGqlVars, (vars) => {
  try {
    return JSON.parse(vars);
  } catch (_e) {
    return {};
  }
});

const getRequestReadyBody = createSelector(
  getText,
  getRequestReadyKV,
  getMIME,
  getFiles,
  getParsedGqlVars,
  (text, kv, mime, files, variables): string | FormData | object => {
    switch (mime) {
      case "application/json":
      case "text/html":
      case "text/plain":
      case "application/xml":
        return text;
      case "application/graphql":
        return {
          query: text,
          variables,
        };
      case "application/x-www-form-urlencoded":
        return qs.stringify(kv);
      case "multipart/form-data":
        return WebApi.createFormData(kv, files);
      default:
        return null;
    }
  }
);

export const HttpReqBodySelectors = {
  getFullBody,
  getActiveEditor,
  getText,
  getMIME,
  getKV,
  getGqlSchema,
  getGqlVars,
  getGqlSchemaError,
  isGqlSchemaLoading,
  getRequestReadyBody,
};
