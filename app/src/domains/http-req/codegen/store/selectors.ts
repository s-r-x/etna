import { TRootState as State } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { HttpReqBodySelectors as BodySelectors } from "@/domains/http-req/body/store/selectors";
import { HttpRequestSelectors as ReqSelectors } from "@/domains/http-req/root/store/selectors";
import { HttpCodegen } from "../generator";
import { DOMAIN } from "./slice";

const $ = (state: State) => state[DOMAIN];
const getTarget = (state: State) => $(state).target;
const getClient = (state: State) => $(state).client;
const getSelectValue = createSelector(
  [getTarget, getClient],
  (target, client) => {
    return [target, client];
  }
);
const getSnippet = createSelector(
  [
    getClient,
    getTarget,
    ReqSelectors.getNormalizedUrl,
    ReqSelectors.getMethod,
    ReqSelectors.getSnippetReadyHeaders,
    BodySelectors.getSnippetReadyBody,
    ReqSelectors.shouldAppendBody,
  ],
  (client, target, url, method, headers, body, shouldAppendBody): string => {
    const snippet = HttpCodegen.generate(
      {
        url,
        method,
        headers,
        postData: shouldAppendBody ? body : undefined,
        bodySize: -1,
        headersSize: -1,
        queryString: [],
        httpVersion: "1.1",
        cookies: [],
      },
      target,
      client
    );
    return snippet;
  }
);

export const HttpCodegenSelectors = {
  getClient,
  getTarget,
  getSnippet,
  getSelectValue,
};
