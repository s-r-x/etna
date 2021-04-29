import { SocketIoClient } from "@socket-io/client";
import { SagaIterator } from "redux-saga";
import { takeLatest, call, select } from "redux-saga/effects";
import { SocketIOSelectors } from "../selectors";
import { SocketIOActions } from "../slice";

function* messageSaga(): SagaIterator {
  console.log("here");
  const event: string = yield select(SocketIOSelectors.getInputEvent);
  const message: string = yield select(
    SocketIOSelectors.getNormalizedInputData
  );
  console.log(message);
  const client: SocketIoClient = yield select(SocketIOSelectors.getClient);
  yield call(client.send, event, message);
}
export default function* watchSocketIoMessage() {
  yield takeLatest(SocketIOActions.sendMessage.type, messageSaga);
}
