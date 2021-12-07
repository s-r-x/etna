import { SagaIterator } from "redux-saga";
import { takeLatest, call, select, put } from "typed-redux-saga";
import { WsRawSelectors } from "../selectors";
import { WsRawActions } from "../slice";

function* messageSaga(): SagaIterator {
  const message = yield* select(WsRawSelectors.getNormalizedInputData);
  const client = yield* select(WsRawSelectors.getClient);
  yield* put(WsRawActions.changeInputData(""));
  yield* call(client.send, message);
}
export default function* watchWsRawMessage() {
  yield* takeLatest(WsRawActions.sendMessage.type, messageSaga);
}
