import { EventChannel, SagaIterator } from "redux-saga";
import { call, put, select, take } from "redux-saga/effects";
import { INotifySagaDto } from "@/domains/ws/typings/dto";
import { SocketIOActions as Actions } from "../slice";
import { SocketIoClient } from "@/domains/ws/clients/SocketIO";
import { SocketIOSelectors } from "../selectors";
import { message } from "antd";

function* connectedSaga(): SagaIterator {
  yield put(Actions.changeConnectStatus(true));
  message.success("Connected");
}
function* disconnectedSaga(): SagaIterator {
  yield put(Actions.changeConnectStatus(false));
  message.error("Disconnected");
}
export default function* socketIoEventsSaga(): SagaIterator {
  const client: SocketIoClient = yield select(SocketIOSelectors.getClient);
  const chan: EventChannel<INotifySagaDto> = yield call(
    client.creataSagaChannel
  );
  while (true) {
    const payload: INotifySagaDto = yield take(chan);

    yield put(Actions.log(payload));

    if (payload.ev === "connected") {
      yield call(connectedSaga);
    } else if (payload.ev === "disconnected") {
      yield call(disconnectedSaga);
    }
  }
}
