import {
  take,
  put,
  fork,
  cancel,
  select,
  cancelled,
  call,
  takeEvery,
  delay,
  all,
  takeLatest,
} from "redux-saga/effects";
import { DOMAIN, loadingStart, loadingError, loadingSuccess } from "./slice";
import { HttpClient } from "@/utils/HttpClient";
import { HttpRequestSelectors as Selectors } from "./selectors";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
function* makeRequest() {
  const client = new HttpClient();
  const state = yield select();
  const [url, method, bodyMIME, headers] = [
    Selectors.getUrl(state),
    Selectors.getMethod(state),
    Selectors.getBodyMIME(state),
    Selectors.getHeaders(state),
  ];
  try {
    yield put(loadingStart());
    const resp = yield client.make(url, method, {
      headers: {
        ...headers,
        "content-type": bodyMIME,
      },
    });
    yield put(loadingSuccess(resp));
  } finally {
    if (yield cancelled()) {
      if (client) {
        client.cancel();
      }
    }
  }
}
function* watchMakeRequest() {
  yield takeLatest(`${DOMAIN}/makeRequest`, makeRequest);
}

export default function* () {
  yield all([watchMakeRequest()]);
}
