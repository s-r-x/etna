import { put, debounce, select } from "typed-redux-saga";
import { DOMAIN, HttpReqActions as Actions } from "../slice";
import { SagaIterator } from "redux-saga";
import _ from "lodash";
import { URLUtils } from "@/utils/url";
import { HttpRequestSelectors as Selectors } from "../selectors";

function* urlSaga(): SagaIterator {
  const url = yield* select(Selectors.getUrl);
  const search = URLUtils.extractSearch(url);
  if (_.isUndefined(search)) {
    yield* put(Actions.setQuery([]));
  } else {
    const newQuery = URLUtils.parseSearchAsArray(search);
    yield* put(Actions.setQuery(newQuery));
  }
}
export default function* watchUrl() {
  yield* debounce(
    200,
    [`${DOMAIN}/changeUrl`, `${DOMAIN}/restoreRequest`],
    urlSaga
  );
}
