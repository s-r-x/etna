import { EWsConnStatus } from "@/domains/ws/shared/typings";
import { SagaIterator } from "redux-saga";
import { put, select, takeLatest, call } from "typed-redux-saga";
import { WsRawSelectors as Selectors } from "../selectors";
import { WsRawActions as Actions } from "../slice";

function* uiConnectionSaga(): SagaIterator {
  const isConnected = yield* select(Selectors.isConnected);
  const isConnecting = yield* select(Selectors.isConnecting);
  if (isConnected) {
    yield* put(Actions.disconnect());
  } else if (isConnecting) {
    const client = yield* select(Selectors.getClient);
    yield* call(client.destroy);
    yield* put(Actions.changeConnStatus(EWsConnStatus.DISCONNECTED));
  } else {
    yield* put(Actions.connect());
  }
}

export default function* socketIoUiSaga(): SagaIterator {
  yield* takeLatest(Actions.uiConnection.type, uiConnectionSaga);
}
