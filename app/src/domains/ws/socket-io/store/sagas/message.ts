import { SagaIterator } from "redux-saga";
import { takeLatest, call, select } from "typed-redux-saga";
import { SocketIOSelectors } from "../selectors";
import { SocketIOActions } from "../slice";

function* messageSaga(): SagaIterator {
  const event = yield* select(SocketIOSelectors.getInputEvent);
  const message = yield* select(SocketIOSelectors.getNormalizedInputData);
  const client = yield* select(SocketIOSelectors.getClient);
  yield* call(client.send, event, message);
}
export default function* watchSocketIoMessage() {
  yield* takeLatest(SocketIOActions.sendMessage.type, messageSaga);
}
