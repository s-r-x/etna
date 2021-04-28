import { SagaIterator } from "redux-saga";
import { takeLatest, call, select } from "redux-saga/effects";
import { SocketIOSelectors as Selectors } from "../selectors";
import { SocketIOActions } from "../slice";
import { SocketIoClient } from "@/domains/ws/clients/SocketIO";

function* connectSaga(): SagaIterator {
  const url: string = yield select(Selectors.getUrl);
  const path: string = yield select(Selectors.getPath);
  const query: TStringDict = yield select(Selectors.getNormalizedQuery);
  const headers: TStringDict = yield select(Selectors.getNormalizedHeaders);
  const client: SocketIoClient = yield select(Selectors.getClient);
  yield call(client.connect, {
    url,
    path,
    query,
    headers,
  });
}
function* disconnectSaga(): SagaIterator {
  const client: SocketIoClient = yield select(Selectors.getClient);
  yield call(client.disconnect);
}
export default function* watchSocketIoConnect() {
  yield takeLatest(SocketIOActions.connect.type, connectSaga);
  yield takeLatest(SocketIOActions.disconnect.type, disconnectSaga);
}
