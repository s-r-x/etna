import { SagaIterator } from "redux-saga";
import { takeLatest, call, select } from "typed-redux-saga";
import { PhoenixSelectors as Selectors } from "../selectors";
import { PhoenixActions as Actions } from "../slice";

function* messageSaga(): SagaIterator {
  const message = yield* select(Selectors.getSendMessageDto);
  console.log(message);
  const client = yield* select(Selectors.getClient);
  yield* call(client.send, message);
}
export default function* watchSocketIoMessage() {
  yield* takeLatest(Actions.sendMessage.type, messageSaga);
}
