import {
  put,
  select,
  cancelled,
  call,
  fork,
  take,
  cancel,
  race,
} from "typed-redux-saga";
import { HttpReqActions as Actions } from "../slice";
import { HttpClient } from "@/utils/HttpClient";
import { HttpRequestSelectors as Selectors } from "../selectors";
import { TResponse } from "@/typings/httpClient";
import { SagaIterator } from "redux-saga";
import { message } from "antd";
import { extractItem } from "@/domains/http-req-history/store/slice";
import { setResponse } from "@/domains/http-res/store/slice";
import { HttpReqBodySelectors } from "@/domains/http-req/body/store/selectors";

function* makeRequestSaga(): SagaIterator {
  const client = new HttpClient();
  const url = yield* select(Selectors.getUrl);
  const method = yield* select(Selectors.getMethod);
  const headers = yield* select(Selectors.getRequestReadyHeaders);
  const settings = yield* select(Selectors.getSettings);
  const body = yield* select(HttpReqBodySelectors.getRequestReadyBody);
  const auth = yield* select(Selectors.getAuth);
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
export default function* watchMakeRequest() {
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
