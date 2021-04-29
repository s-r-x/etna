import { PhoenixClient } from "@phoenix/client";
import { SagaIterator } from "redux-saga";
import { call, select, takeLatest } from "typed-redux-saga";
import { PhoenixSelectors as Selectors } from "../selectors";
import { PhoenixActions } from "../slice";

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
}
function* disconnectSaga(): SagaIterator {
  const client: PhoenixClient = yield* select(Selectors.getClient);
  yield* call(client.disconnect);
}

export default function* watchPhoenixConnect() {
  yield* takeLatest(PhoenixActions.connect.type, connectSaga);
  yield* takeLatest(PhoenixActions.disconnect.type, disconnectSaga);
}
