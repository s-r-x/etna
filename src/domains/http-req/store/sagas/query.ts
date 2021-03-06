import { put, select, debounce } from "redux-saga/effects";
import { HttpReqActions as Actions } from "../slice";
import { SagaIterator } from "redux-saga";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { URLUtils } from "@/utils/url";
import _ from "lodash";

function* querySaga(): SagaIterator {
  const state = yield select();
  const query = Selectors.getQuery(state);
  const url = Selectors.getUrl(state);
  const parsed = URLUtils.parseUrl(url);
  if (_.isEmpty(query)) {
    parsed.query("");
  } else {
    const search = query.map(({ key, value }) => key + "=" + value).join("&");
    parsed.query("?" + search);
  }
  yield put(Actions._changeUrlWithoutTouchingQuery(parsed.toString()));
}
export default function* watchQuery() {
  yield debounce(
    200,
    [
      Actions.changeQueryKey.type,
      Actions.changeQueryValue.type,
      Actions.removeQuery.type,
      Actions.addQuery.type,
    ],
    querySaga
  );
}
