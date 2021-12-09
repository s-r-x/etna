import { TRootState as State } from "@/store/rootReducer";
import { createSelector } from "reselect";
import { HttpRequestSelectors as ReqSelectors } from "../../root/store/selectors";
import { HttpCodegen } from "../generator";
import { DOMAIN } from "./slice";

const $ = (state: State) => state[DOMAIN];
const getTarget = (state: State) => $(state).target;
const getClient = (state: State) => $(state).client;
const getSelectValue = createSelector([getTarget, getClient], (target, client) => {
  return [target, client];
});
const getSnippet = createSelector(
  [
    getClient,
    getTarget,
    ReqSelectors.getUrl,
    ReqSelectors.getMethod,
    ReqSelectors.getSnippetReadyHeaders,
  ],
  (client, target, url, method, headers): string => {
    const snippet = HttpCodegen.generate(
      {
        url,
        method,
        headers,
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
