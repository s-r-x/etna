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
import { DOMAIN, loadingStart, loadingEnd } from "../slice";
import { HttpClient } from "@/utils/HttpClient";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { TResponse } from "@/typings/httpClient";
import { SagaIterator, Task } from "redux-saga";
import { message } from "antd";
import { addItem as addHistoryItem } from "@/store/history/slice";
import { setResponse } from "@/store/httpResponse/slice";

function* makeRequest(): SagaIterator {
  const client = new HttpClient();
  const state = yield select();
  const [url, method, headers, settings, body] = [
    Selectors.getUrl(state),
    Selectors.getMethod(state),
    Selectors.getRequestReadyHeaders(state),
    Selectors.getSettings(state),
    Selectors.getRequestReadyBody(state),
  ];
  try {
    yield put(loadingStart());
    const resp: TResponse = yield call(client.make, url, method, {
      headers,
      expectBinary: settings.expectBinary,
      body,
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
  while (yield take(`${DOMAIN}/makeRequest`)) {
    const task: Task = yield fork(makeRequest);
    const [cancelCase]: TakeEffect[] = yield race([
      take(`${DOMAIN}/cancelRequest`),
      take(`${DOMAIN}/loadingEnd`),
    ]);
    if (cancelCase) {
      yield cancel(task);
    }
  }
}
