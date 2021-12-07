import { createSelector } from "@reduxjs/toolkit";
import { TRootState as State } from "@/store/rootReducer";
import { DOMAIN } from "./slice";
import { buildClientSchema } from "graphql";
import { WebApi } from "@/utils/webapi";
import qs from "query-string";
import _ from "lodash";

export async function dataUrlToFile(
  dataUrl: string,
  mime: string,
  fileName: string
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: mime });
}
const $ = (state: State) => state[DOMAIN];
const getText = (state: State) => $(state).text;
const getMIME = (state: State) => $(state).mime;
const getKV = (state: State) => $(state).kv;
const getRequestReadyKV = createSelector(getKV, (kv) => {
  return kv.filter(({ active }) => active);
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
const getGqlRawSchema = (state: State) => $(state).gql.schema;
const getGqlSchema = createSelector(getGqlRawSchema, (schema) => {
  try {
    return schema && buildClientSchema(JSON.parse(schema)?.data);
  } catch (_e) {
    return null;
  }
});
const isGqlSchemaLoading = (state: State) => $(state).gql.loading;
const getGqlSchemaError = (state: State) => $(state).gql.error;
const getGqlVars = (state: State) => $(state).gql.vars;
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
  getParsedGqlVars,
  async (text, kv, mime, variables): Promise<string | FormData | object> => {
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
        return qs.stringify(
          _.fromPairs(kv.map(({ key, value }) => [key, value]))
        );
      case "multipart/form-data":
        const normalizedKv = await Promise.all(
          kv.map(async (data) => {
            return {
              key: data.key,
              fileName: data.fileName,
              value: data.isFile
                ? await dataUrlToFile(data.value, data.mime, data.fileName)
                : data.value,
            };
          })
        );
        return WebApi.createFormData(normalizedKv);
      default:
        return null;
    }
  }
);

export const HttpReqBodySelectors = {
  getFullBody: $,
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
