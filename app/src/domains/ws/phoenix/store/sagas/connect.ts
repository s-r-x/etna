import { EWsConnStatus } from "@/domains/ws/shared/typings";
import { SagaIterator } from "redux-saga";
import { call, select, takeLatest, put } from "typed-redux-saga";
import { PhoenixSelectors as Selectors } from "../selectors";
import { PhoenixActions as Actions } from "../slice";

function* connectSaga(): SagaIterator {
  const url = yield* select(Selectors.getUrl);
  const query = yield* select(Selectors.getNormalizedQuery);
  const client = yield* select(Selectors.getClient);
  const channels = yield* select(Selectors.getChannels);
  yield* call(client.connect, {
    url,
    query,
    channels,
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

export default function* watchPhoenixConnect() {
  yield* takeLatest(Actions.connect.type, connectSaga);
  yield* takeLatest(Actions.disconnect.type, disconnectSaga);
  yield* takeLatest(Actions.interrupt.type, interruptSaga);
}
