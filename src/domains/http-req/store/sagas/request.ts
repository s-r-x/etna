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
import { HttpReqActions as Actions } from "../slice";
import { HttpClient } from "@/utils/HttpClient";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { TResponse } from "@/typings/httpClient";
import { SagaIterator, Task } from "redux-saga";
import { message } from "antd";
import { extractItem } from "@/domains/http-req-history/store/slice";
import { setResponse } from "@/domains/http-res/store/slice";
import { HttpReqBodySelectors } from "@/domains/http-req-body/store/selectors";

function* makeRequestSaga(): SagaIterator {
  const client = new HttpClient();
  const state = yield select();
  const [url, method, headers, settings, body, authStrategy, basicAuth] = [
    Selectors.getUrl(state),
    Selectors.getMethod(state),
    Selectors.getRequestReadyHeaders(state),
    Selectors.getSettings(state),
    HttpReqBodySelectors.getRequestReadyBody(state),
    Selectors.getAuthStrategy(state),
    Selectors.getBasicAuthData(state),
  ];
  try {
    yield put(Actions.loadingStart());
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
      yield put(extractItem());
    }
  } finally {
    yield put(Actions.loadingEnd());
    if (yield cancelled()) {
      client.cancel();
    }
  }
}
export default function* watchMakeRequest(): SagaIterator {
  while (yield take(Actions.makeRequest.type)) {
    const task: Task = yield fork(makeRequestSaga);
    const [cancelCase]: TakeEffect[] = yield race([
      take(Actions.cancelRequest.type),
      take(Actions.loadingEnd.type),
    ]);
    if (cancelCase) {
      yield cancel(task);
    }
  }
}
