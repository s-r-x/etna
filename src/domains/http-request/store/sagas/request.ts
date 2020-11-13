import {
  put,
  select,
  cancelled,
  call,
  fork,
  take,
  cancel,
  race,
  TakeEffect,
} from "redux-saga/effects";
import { loadingStart, loadingEnd, makeRequest, cancelRequest } from "../slice";
import { HttpClient } from "@/utils/HttpClient";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { TResponse } from "@/typings/httpClient";
import { SagaIterator, Task } from "redux-saga";
import { message } from "antd";
import { addItem as addHistoryItem } from "@/domains/http-request-history/store/slice";
import { setResponse } from "@/domains/http-response/store/slice";

function* makeRequestSaga(): SagaIterator {
  const client = new HttpClient();
  const state = yield select();
  const [url, method, headers, settings, body, authStrategy, basicAuth] = [
    Selectors.getUrl(state),
    Selectors.getMethod(state),
    Selectors.getRequestReadyHeaders(state),
    Selectors.getSettings(state),
    Selectors.getRequestReadyBody(state),
    Selectors.getAuthStrategy(state),
    Selectors.getBasicAuthData(state),
  ];
  try {
    yield put(loadingStart());
    const resp: TResponse = yield call(client.make, url, method, {
      headers,
      expectBinary: settings.expectBinary,
      body,
      auth: authStrategy === "basic" ? basicAuth : null,
      useProxy: settings.useProxy,
    });
    if (resp.error && resp.data) {
      message.error(resp.data);
    }
    yield put(setResponse(resp));
    if (resp.status) {
      yield put(
        addHistoryItem({
          method,
          url,
          date: new Date().toISOString(),
          wait: resp.responseTime,
          status: resp.status,
        })
      );
    }
  } finally {
    yield put(loadingEnd());
    if (yield cancelled()) {
      client.cancel();
    }
  }
}
export default function* watchMakeRequest(): SagaIterator {
  while (yield take(makeRequest.type)) {
    const task: Task = yield fork(makeRequestSaga);
    const [cancelCase]: TakeEffect[] = yield race([
      take(cancelRequest.type),
      take(loadingEnd.type),
    ]);
    if (cancelCase) {
      yield cancel(task);
    }
  }
}
