import { put, select, debounce } from "typed-redux-saga";
import { HttpReqActions as Actions } from "../slice";
import { SagaIterator } from "redux-saga";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { URLUtils } from "@/utils/url";
import _ from "lodash";

const WATCH_DELAY = 200;
function* querySaga(): SagaIterator {
  const query = yield* select(Selectors.getQuery);
  const url = yield* select(Selectors.getUrl);
  const parsed = URLUtils.parseUrl(url);
  if (_.isEmpty(query)) {
    parsed.query("");
  } else {
    const search = query.map(({ key, value }) => key + "=" + value).join("&");
    parsed.query("?" + search);
  }
  yield* put(Actions._changeUrlWithoutTouchingQuery(parsed.toString()));
}
export default function* watchQuery() {
  yield* debounce(
    WATCH_DELAY,
    [
      Actions.changeQueryKey.type,
      Actions.changeQueryValue.type,
      Actions.removeQuery.type,
      Actions.addQuery.type,
    ],
    querySaga
  );
}
