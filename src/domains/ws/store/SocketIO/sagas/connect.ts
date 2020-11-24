import { SagaIterator } from "redux-saga";
import { takeLatest, call, select } from "redux-saga/effects";
import { SocketIOSelectors } from "../selectors";
import { SocketIOActions } from "../slice";
import { SocketIoClient } from "@/domains/ws/clients/SocketIO";

function* connectSaga(): SagaIterator {
  const url: string = yield select(SocketIOSelectors.getUrl);
  const path: string = yield select(SocketIOSelectors.getPath);
  const query: TStringDict = yield select(SocketIOSelectors.getNormalizedQuery);
  const headers: TStringDict = yield select(
    SocketIOSelectors.getNormalizedHeaders
  );
  const client: SocketIoClient = yield select(SocketIOSelectors.getClient);
  yield call(client.connect, {
    url,
    path,
    query,
    headers,
  });
}
function* disconnectSaga(): SagaIterator {
  const client: SocketIoClient = yield select(SocketIOSelectors.getClient);
  yield call(client.disconnect);
}
export default function* watchSocketIoConnect() {
  yield takeLatest([SocketIOActions.connect.type], connectSaga);
  yield takeLatest([SocketIOActions.disconnect.type], disconnectSaga);
}
