import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeLatest } from "typed-redux-saga";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";

function* createChannelSaga(): SagaIterator {
  const form = yield* select(Selectors.getCreateChannelForm);
  yield* put(
    Actions.addChannel({
      topic: form.topic,
    })
  );
}
function* removeChannelSaga({
  payload: topic,
}: PayloadAction<string>): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.removeChannel, topic);
}
function* connectChannelSaga({
  payload: topic,
}: PayloadAction<string>): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.connectChannel, topic);
}
function* disconnectChannelSaga({
  payload: topic,
}: PayloadAction<string>): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.disconnectChannel, topic);
}
export default function* watchPhoenixChannels() {
  yield* takeLatest(Actions.createChannel.type, createChannelSaga);
  yield* takeLatest(Actions.removeChannel.type, removeChannelSaga);
  yield* takeLatest(Actions.connectChannel.type, connectChannelSaga);
  yield* takeLatest(Actions.disconnectChannel.type, disconnectChannelSaga);
}
