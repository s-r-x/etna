import { put, select, debounce } from "redux-saga/effects";
import { HttpReqBodyActions as Actions } from "../slice";
import { SagaIterator } from "redux-saga";
import { HttpReqBodySelectors as Selectors } from "../selectors";
import { HttpRequestSelectors } from "@/domains/http-req/store/selectors";
import { HttpReqActions } from "@/domains/http-req/store/slice";

function* bodyMimeSaga(): SagaIterator {
  const state = yield select();
  const mime = Selectors.getMIME(state),
    headers = HttpRequestSelectors.getHeaders(state);
  const contentHeaderIdx = headers.findIndex(
    ({ key }) => key === "Content-Type"
  );
  if (contentHeaderIdx !== -1) {
    yield put(
      HttpReqActions.changeHeaderValue({ id: contentHeaderIdx, value: mime })
    );
  } else {
    yield put(
      HttpReqActions.addHeader({
        key: "Content-Type",
        value: mime,
        active: true,
      })
    );
  }
}
export default function* watchBodyMime() {
  yield debounce(200, Actions.changeMIME.type, bodyMimeSaga);
}
