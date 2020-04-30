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
import { TResponse } from "@/typings/httpClient";
import { SagaIterator } from "redux-saga";

function* makeRequest(): SagaIterator {
  const client = new HttpClient();
  const state = yield select();
  const [url, method, bodyMIME, headers] = [
    Selectors.getUrl(state),
    Selectors.getMethod(state),
    Selectors.getBodyMIME(state),
    Selectors.getRequestReadyHeaders(state),
  ];
  try {
    yield put(loadingStart());
    const resp: TResponse = yield call(client.make, url, method, {
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
