import { EventChannel, SagaIterator } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { INotifySagaDto } from "@/domains/ws/typings/dto";
import { PhoenixActions as Actions } from "../slice";
import { PhoenixSelectors as Selectors } from "../selectors";
import { message } from "antd";
import { PhoenixClient } from "@/domains/ws/clients/Phoenix";

function* connectedSaga(payload: INotifySagaDto): SagaIterator {
  if (payload.room) {
    yield put(
      Actions.changeChannelConnectStatus({
        topic: payload.room,
        connected: true,
      })
    );
    message.success(`Channel ${payload.room} connected`);
  } else {
    yield put(Actions.changeConnectStatus(true));
    message.success("Socket connected");
  }
}
function* disconnectedSaga(payload: INotifySagaDto): SagaIterator {
  if (payload.room) {
    yield put(
      Actions.changeChannelConnectStatus({
        topic: payload.room,
        connected: false,
      })
    );
    message.error(`Channel ${payload.room} disconnected`);
  } else {
    yield put(Actions.changeConnectStatus(false));
    message.error("Socket disconnected");
  }
}
export default function* phoenixEventsSaga(): SagaIterator {
  const client: PhoenixClient = yield select(Selectors.getClient);
  const chan: EventChannel<INotifySagaDto> = yield call(
    client.creataSagaChannel
  );
  while (true) {
    const payload: INotifySagaDto = yield take(chan);

    yield put(Actions.log(payload));
    if (payload.ev === "connected") {
      yield call(connectedSaga, payload);
    } else if (payload.ev === "disconnected") {
      yield call(disconnectedSaga, payload);
    }
  }
}
