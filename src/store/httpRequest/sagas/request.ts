import { put, select, cancelled, call, takeLatest } from "redux-saga/effects";
import { DOMAIN, loadingStart, loadingEnd } from "../slice";
import { HttpClient } from "@/utils/HttpClient";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { TResponse } from "@/typings/httpClient";
import { SagaIterator } from "redux-saga";
import { message } from "antd";
import { addItem as addHistoryItem } from "@/store/history/slice";

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
    if (resp.error) {
      message.error(resp.data);
    }
    yield put(loadingEnd(resp));
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
    if (yield cancelled()) {
      client.cancel();
    }
  }
}
export default function* watchMakeRequest() {
  yield takeLatest(`${DOMAIN}/makeRequest`, makeRequest);
}
