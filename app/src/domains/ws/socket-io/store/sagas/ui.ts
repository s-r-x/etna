import { SagaIterator } from "redux-saga";
import { put, select, takeLatest, call } from "typed-redux-saga";
import { SocketIOSelectors as Selectors } from "../selectors";
import { SocketIOActions as Actions } from "../slice";

function* uiConnectionClickSaga(): SagaIterator {
  const isConnected = yield* select(Selectors.isConnected);
  const isConnecting = yield* select(Selectors.isConnecting);
  if (isConnected) {
    yield* put(Actions.disconnect());
  } else if (isConnecting) {
    const client = yield* select(Selectors.getClient);
    yield* call(client.destroy);
    yield* put(Actions.changeConnectingStatus(false));
  } else {
    yield* put(Actions.connect());
  }
}

export default function* socketIoUiSaga(): SagaIterator {
  yield* takeLatest(Actions.uiConnectionClick.type, uiConnectionClickSaga);
}
