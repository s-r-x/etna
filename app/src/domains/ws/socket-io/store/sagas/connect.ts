import { EWsConnStatus } from "@/domains/ws/shared/typings";
import { SagaIterator } from "redux-saga";
import { takeLatest, call, select, put } from "typed-redux-saga";
import { SocketIOSelectors as Selectors } from "../selectors";
import { SocketIOActions as Actions } from "../slice";

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
  yield* put(Actions.changeConnStatus(EWsConnStatus.CONNECTING));
}
function* disconnectSaga(): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.disconnect);
}
function* interruptSaga(): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.destroy);
  yield* put(Actions.changeConnStatus(EWsConnStatus.DISCONNECTED));
}
export default function* watchSocketIoConnect() {
  yield* takeLatest(Actions.connect.type, connectSaga);
  yield* takeLatest(Actions.disconnect.type, disconnectSaga);
  yield* takeLatest(Actions.interrupt.type, interruptSaga);
}
