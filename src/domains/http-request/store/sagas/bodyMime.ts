import { put, select, debounce } from "redux-saga/effects";
import { DOMAIN } from "../slice";
import { SagaIterator } from "redux-saga";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { changeHeaderValue, addHeader } from "../slice";

function* bodyMimeSaga(): SagaIterator {
  const state = yield select();
  const mime = Selectors.getBodyMIME(state),
    headers = Selectors.getHeaders(state);
  const contentHeaderIdx = headers.findIndex(
    ({ key }) => key === "Content-Type"
  );
  if (contentHeaderIdx !== -1) {
    yield put(changeHeaderValue({ id: contentHeaderIdx, value: mime }));
  } else {
    yield put(
      addHeader({
        key: "Content-Type",
        value: mime,
        active: true,
      })
    );
  }
}
export default function* watchBodyMime() {
  yield debounce(200, `${DOMAIN}/changeBodyMIME`, bodyMimeSaga);
}
