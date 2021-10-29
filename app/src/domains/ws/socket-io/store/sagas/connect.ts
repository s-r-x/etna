import { SagaIterator } from "redux-saga";
import { takeLatest, call, select } from "typed-redux-saga";
import { SocketIOSelectors as Selectors } from "../selectors";
import { SocketIOActions } from "../slice";

function* connectSaga(): SagaIterator {
  const url = yield* select(Selectors.getUrl);
  const path = yield* select(Selectors.getPath);
  const query = yield* select(Selectors.getNormalizedQuery);
  const headers = yield* select(Selectors.getNormalizedHeaders);
  const client = yield* select(Selectors.getClient);
  const options = yield* select(Selectors.getOptions);
  yield* call(client.connect, {
    url,
    path,
    query,
    headers,
    options,
  });
}
function* disconnectSaga(): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.disconnect);
}
export default function* watchSocketIoConnect() {
  yield* takeLatest(SocketIOActions.connect.type, connectSaga);
  yield* takeLatest(SocketIOActions.disconnect.type, disconnectSaga);
}
