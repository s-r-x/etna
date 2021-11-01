import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeLatest } from "typed-redux-saga";
import { PhoenixSelectors as Selectors } from "@phoenix/store/selectors";
import { PhoenixActions as Actions } from "@phoenix/store/slice";
import { IConnectPhoenixChannelDto } from "../../typings/dto";

function* createChannelSaga(): SagaIterator {
  const form = yield* select(Selectors.getChannelForm);
  yield* put(
    Actions.addChannel({
      topic: form.topic,
      query: form.query,
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
  payload,
}: PayloadAction<IConnectPhoenixChannelDto>): SagaIterator {
  const client = yield* select(Selectors.getClient);
  yield* call(client.connectChannel, payload);
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
