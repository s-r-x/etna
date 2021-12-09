import {
  put,
  select,
  cancelled,
  call,
  fork,
  take,
  cancel,
  race,
  all,
  takeLatest,
} from "typed-redux-saga";
import { HttpReqActions as Actions } from "../slice";
import { HttpClient } from "@/domains/http-req/httpClient";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { TResponse } from "@/typings/httpClient";
import { SagaIterator } from "redux-saga";
import { message } from "antd";
import { extractItem } from "@/domains/http-history/store/slice";
import { setResponse } from "@/domains/http-res/store/slice";
import { HttpReqBodySelectors } from "@/domains/http-req/body/store/selectors";

function* makeRequestSaga(): SagaIterator {
  const url = yield* select(Selectors.getNormalizedUrl);
  if (!url) {
    yield* put(Actions.loadingEnd());
    return;
  }
  const isUrlValid = yield* select(Selectors.isUrlValid);
  if (!isUrlValid) {
    message.error("Invalid URL");
    yield* put(Actions.loadingEnd());
    return;
  }
  const client = new HttpClient();
  const method = yield* select(Selectors.getMethod);
  const headers = yield* select(Selectors.getRequestReadyHeaders);
  const settings = yield* select(Selectors.getSettings);
  const state = yield* select(state => state);
  const auth = yield* select(Selectors.getAuth);
  const body = yield* call(HttpReqBodySelectors.getRequestReadyBody, state);
  try {
    yield* put(Actions.loadingStart());
    const resp: TResponse = yield* call(client.make, url, method, {
      headers,
      expectBinary: settings.expectBinary,
      body,
      auth,
      useProxy: settings.useProxy,
    });
    if (resp.error && resp.data) {
      message.error(resp.data);
    }
    yield* put(setResponse(resp));
    if (resp.status) {
      yield* put(extractItem());
    }
  } finally {
    yield* put(Actions.loadingEnd());
    if (yield* cancelled()) {
      client.cancel();
    }
  }
}
function* watchMakeRequest() {
  while (yield* take(Actions.makeRequest.type)) {
    const task = yield* fork(makeRequestSaga);
    const [cancelCase] = yield* race([
      take(Actions.cancelRequest.type),
      take(Actions.loadingEnd.type),
    ]);
    if (cancelCase) {
      yield* cancel(task);
    }
  }
}
function* makeOrCancelRequestSaga() {
  yield takeLatest(Actions.makeOrCancelRequest, function* () {
    if (yield* select(Selectors.getLoading)) {
      yield put(Actions.cancelRequest());
    } else {
      yield put(Actions.makeRequest());
    }
  });
}

export default function* main() {
  yield all([watchMakeRequest(), makeOrCancelRequestSaga()]);
}
