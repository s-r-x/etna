import { put, debounce, select } from "redux-saga/effects";
import { DOMAIN, setQuery } from "../slice";
import { SagaIterator } from "redux-saga";
import _ from "lodash";
import { URLUtils } from "@/utils/url";
import { HttpRequestSelectors as Selectors } from "../selectors";

function* urlSaga(): SagaIterator {
  const url: string = yield select(Selectors.getUrl);
  const search = URLUtils.extractSearch(url);
  if (_.isUndefined(search)) {
    yield put(setQuery([]));
  } else {
    const newQuery = URLUtils.parseSearchAsArray(search);
    yield put(setQuery(newQuery));
  }
}
export default function* watchUrl() {
  yield debounce(
    200,
    [`${DOMAIN}/changeUrl`, `${DOMAIN}/restoreRequest`],
    urlSaga
  );
}
