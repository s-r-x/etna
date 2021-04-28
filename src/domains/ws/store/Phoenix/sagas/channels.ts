import { PhoenixClient } from "@/domains/ws/clients/Phoenix";
import { TPhoenixCreateChannelForm } from "@/domains/ws/typings/store";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { PhoenixSelectors as Selectors } from "../selectors";
import { PhoenixActions as Actions } from "../slice";

function* createChannelSaga(): SagaIterator {
  const form: TPhoenixCreateChannelForm = yield select(
    Selectors.getCreateChannelForm
  );
  yield put(
    Actions.addChannel({
      topic: form.topic,
    })
  );
}
function* removeChannelSaga({
  payload: topic,
}: PayloadAction<string>): SagaIterator {
  const client: PhoenixClient = yield select(Selectors.getClient);
  yield call(client.removeChannel, topic);
}
function* connectChannelSaga({
  payload: topic,
}: PayloadAction<string>): SagaIterator {
  const client: PhoenixClient = yield select(Selectors.getClient);
  yield call(client.connectChannel, topic);
}
function* disconnectChannelSaga({
  payload: topic,
}: PayloadAction<string>): SagaIterator {
  const client: PhoenixClient = yield select(Selectors.getClient);
  yield call(client.disconnectChannel, topic);
}
export default function* watchPhoenixChannels() {
  yield takeLatest(Actions.createChannel.type, createChannelSaga);
  yield takeLatest(Actions.removeChannel.type, removeChannelSaga);
  yield takeLatest(Actions.connectChannel.type, connectChannelSaga);
  yield takeLatest(Actions.disconnectChannel.type, disconnectChannelSaga);
}
